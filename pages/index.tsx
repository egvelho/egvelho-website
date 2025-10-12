import { slugify } from "@egvelho/next-meta/utils/slugify";
import { pages, links } from "app/url";
import { scripts } from "app/scripts";
import { getAllPosts } from "app/cms/blog-page/get-all-posts";

export { Home as default } from "app/home/home";

const cardsImages = {
  datasets: "/images/datasets.jpg",
  research: "/images/research.jpg",
  openSource: "/images/open-source.jpg",
};

export const getStaticProps = pages.index.getStaticProps(async () => {
  await scripts();
  const posts = await getAllPosts();
  const list = posts.slice(0, 6).map(({ data, id, slug }) => ({
    href: links.post.href({ slug }),
    image: data.image,
    encodedDate: data.publishDate
      ? new Date(data.publishDate).toJSON()
      : new Date().toJSON(),
    title: data.title,
    key: id,
  }));

  const datasetsLastPost = posts.find(
    ({ data: { tags, publishDate } }) =>
      tags.some((tag) => slugify(tag) === "datasets") && publishDate
  );

  const researchLastPost = posts.find(
    ({ data: { tags, publishDate } }) =>
      tags.some((tag) => slugify(tag) === "pesquisa") && publishDate
  );

  const openSourceLastPost = posts.find(
    ({ data: { tags, publishDate } }) =>
      tags.some((tag) => slugify(tag) === "open-source") && publishDate
  );

  const cards = [
    {
      title: links.datasets.longLabel,
      href: links.datasets.href,
      image: cardsImages.datasets,
      key: "datasets",
      encodedDate: datasetsLastPost?.data?.publishDate
        ? new Date(datasetsLastPost.data.publishDate).toJSON()
        : new Date().toJSON(),
    },
    {
      title: links.research.longLabel,
      href: links.research.href,
      image: cardsImages.research,
      key: "research",
      encodedDate: researchLastPost?.data?.publishDate
        ? new Date(researchLastPost.data.publishDate).toJSON()
        : new Date().toJSON(),
    },
    {
      title: links.openSource.longLabel,
      href: links.openSource.href,
      image: cardsImages.openSource,
      key: "open-source",
      encodedDate: openSourceLastPost?.data?.publishDate
        ? new Date(openSourceLastPost.data.publishDate).toJSON()
        : new Date().toJSON(),
    },
  ];

  const blogOverviewSection = { list, cards };
  return { blogOverviewSection };
});

export const priority = pages.index.priority(0.7);
export const disallow = pages.index.disallow(false);
export const changeFrequency = pages.index.changeFrequency("monthly");
export const getLastModificationDate = pages.index.getLastModificationDate(
  async () => new Date()
);
