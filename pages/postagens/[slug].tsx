import type Fs from "fs";
import type Path from "path";
import * as collectionUtils from "@egvelho/next-meta/cms/collection-utils";
import { pages, links, ExtractPageProps } from "app/url";
import paths from "app/cms/paths.json";
import type { BlogPost } from "app/cms/blog-post";
import { getAllPosts } from "app/cms/blog-page/get-all-posts";

export { Post as default } from "app/blog/post";

type RecommendedPostsPropType = ExtractPageProps<
  typeof pages.post
>["recommendedPosts"];

export const getStaticPaths = pages.post.getStaticPaths(async () => {
  const postsPath = await collectionUtils.useCollectionFolder(paths.posts, {
    createFolderIfNotExists: true,
  });
  const slugs = await collectionUtils.getSlugs(postsPath);

  return slugs.map((slug) => ({ slug }));
});

export const getStaticProps = pages.post.getStaticProps(async (query) => {
  const postPath = await collectionUtils.useCollectionFile(
    `${paths.posts}/${query.slug}.json`
  );

  const { data, slug } = await collectionUtils.getCollectionFile<BlogPost>(
    postPath
  );

  const currentTags = data.tags.map((tag) => collectionUtils.slugify(tag));
  const currentSlug = slug;

  const allPosts = await getAllPosts();

  const latestRecommendedPosts = allPosts.filter(
    ({ data: { tags }, slug }) =>
      slug !== currentSlug &&
      tags.some((tag) => currentTags.includes(collectionUtils.slugify(tag)))
  );

  const fullRecommendedPosts = latestRecommendedPosts.concat(
    allPosts.filter(
      ({ slug }) =>
        slug !== currentSlug &&
        !latestRecommendedPosts.some((post) => post.slug === slug)
    )
  );

  const recommendedPosts: RecommendedPostsPropType = fullRecommendedPosts
    .map(({ data: { titleColor, ...post }, slug }) => ({
      ...post,
      href: links.post.href({ slug }),
      key: slug,
    }))
    .slice(0, 4);

  return {
    ...data,
    slug,
    content: await collectionUtils.markdownToHtml(data.content ?? ""),
    recommendedPosts,
  };
});

export const priority = pages.post.priority(1);
export const disallow = pages.post.disallow(false);
export const changeFrequency = pages.post.changeFrequency("monthly");
export const getLastModificationDate = pages.post.getLastModificationDate(
  async ({ slug }) => {
    const fs: typeof Fs = eval(`require("fs")`);
    const path: typeof Path = eval(`require("path")`);
    const postFile = await fs.promises.readFile(
      path.join(paths.posts, `${slug}.json`)
    );
    const post: BlogPost = JSON.parse(postFile.toString());
    const modificationDate = post.publishDate
      ? new Date(post.publishDate)
      : new Date();
    return modificationDate;
  }
);
