import { useState, useEffect } from "react";
import { slugify } from "@egvelho/next-meta/utils/slugify";
import { truncateString } from "@egvelho/next-mui/utils/truncate-string";
import { useViewport } from "@egvelho/next-mui/utils/use-viewport";
import { BlogPage } from "@egvelho/next-mui/blog-page/blog-page";
import { ClientRender } from "@egvelho/next-mui/components/client-render";
import {
  links,
  pages,
  client,
  ExtractPageProps,
  ExtractClientResponse,
} from "app/url";
import { showDate } from "app/cms/show-date";
import { Meta } from "app/meta";
import { useContext } from "app/context";
import appConfig from "app.json";
import blogMetadata from "./blog-metadata.json";
import blogStyle from "./blog-style.json";

type PostsPropType = ExtractPageProps<typeof pages.blog>["posts"][0];

const texts = {
  noOptionsText: "Sem resultados",
  noResultsText: "Nenhum resultado foi encontrado",
  noResultsDescription:
    "Esta página não possui conteúdo. Por favor, tente outra busca.",
  placeholder: "Buscar postagens",
  getTitle(initialTag: string | undefined) {
    return initialTag ? `Em "${initialTag}"` : blogMetadata.title;
  },
};

export const Blog = pages.blog.page((props) => {
  const { useIsLaptop } = useViewport();
  const isLaptop = useIsLaptop();
  const title = texts.getTitle(props.initialTag);
  const initialSelectedTags = props.initialTag ? [props.initialTag] : [];
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState(props.posts);
  const [postsLength, setPostsLength] = useState(props.postsLength);
  const [selectedTags, setSelectedTags] = useState(initialSelectedTags);
  const [tags, setTags] = useState(props.tags);

  const {
    context: { loading },
  } = useContext();

  useEffect(() => {
    setPage(0);
    setPosts(props.posts);
    setPostsLength(props.postsLength);
    setSelectedTags(initialSelectedTags);
    setTags(props.tags);
  }, [props.initialTag]);

  return (
    <>
      <Meta
        title={title}
        description={blogMetadata.description}
        image={blogMetadata.image}
        keywords={blogMetadata.keywords}
        url={links.index.href}
      />
      <BlogPage
        noOptionsText={texts.noOptionsText}
        noResultsText={texts.noResultsText}
        noResultsDescription={texts.noResultsDescription}
        placeholder={selectedTags.length > 0 ? "" : texts.placeholder}
        title={title}
        titleColor={blogStyle.color}
        background={
          blogStyle.backgroundImage
            ? `url(${blogStyle.backgroundImage})`
            : blogStyle.backgroundColor || appConfig.secondaryColor
        }
        breadcrumbs={[
          { key: "home", href: links.index.href, label: links.index.label },
          {
            key: "blog",
            href: links.blog.href,
            label: links.blog.label,
          },
        ].concat(
          props.initialTag
            ? {
                key: "tag",
                href: links.blogTag.href({ tag: slugify(props.initialTag) }),
                label: truncateString(props.initialTag, isLaptop ? 12 : 7),
              }
            : []
        )}
        onRequestMorePosts={async () => {
          const nextPage = page + 1;
          const maybeNextPosts = await client.getPosts({
            page: nextPage.toString(),
          });

          if (maybeNextPosts.data) {
            setPage(nextPage);
            setPosts(
              posts.concat(
                maybeNextPosts.data.map(
                  ({ slug, data: { content, ...data } }) => ({
                    slug,
                    ...data,
                  })
                )
              )
            );
          }
        }}
        hasMorePosts={posts.length < postsLength}
        posts={posts.map((post) => mapPostToItem(post))}
        loading={loading}
        disabled={loading}
        onChange={async (nextSelectedTags) => {
          if (props.initialTag && nextSelectedTags.length === 0) {
            return;
          }

          if (
            props.initialTag &&
            nextSelectedTags.length > 0 &&
            nextSelectedTags[0] !== props.initialTag
          ) {
            return;
          }

          setSelectedTags(nextSelectedTags);

          if (
            nextSelectedTags.length === 0 ||
            (props.initialTag && nextSelectedTags.length === 1)
          ) {
            setPage(0);
            setPostsLength(props.postsLength);
            setPosts(props.posts);
            setTags(props.tags);
          } else if (
            props.initialTag === undefined &&
            nextSelectedTags.length === 1
          ) {
            const [tag] = nextSelectedTags;
            const maybeNextPosts = await client.getPostsForTag({
              tag: slugify(tag),
            });

            if (maybeNextPosts.data) {
              const nextPosts = maybeNextPosts.data.map((request) =>
                mapRequestToPost(request)
              );
              const nextTags = mapPostsToTags(nextPosts);

              setPosts(nextPosts);
              setPostsLength(nextPosts.length);
              setTags(nextTags);
            }
          } else {
            const nextPosts = posts.filter(({ tags }) =>
              nextSelectedTags.every((tag) => tags.includes(tag))
            );
            const nextTags = mapPostsToTags(nextPosts);

            setPosts(nextPosts);
            setPostsLength(nextPosts.length);
            setTags(nextTags);
          }
        }}
        options={tags}
        value={selectedTags}
      />
    </>
  );
});

function mapPostToItem(post: PostsPropType) {
  const publishDateTime =
    (post.publishDate && new Date(post.publishDate)) || undefined;

  return {
    title: post.title,
    subtitle: post.description,
    authorName: post.authorName,
    authorPicture: post.authorPicture,
    date: publishDateTime,
    dateText: (
      <ClientRender>
        {publishDateTime ? showDate(publishDateTime) : ""}
      </ClientRender>
    ),
    image: post.image,
    tags: post.tags.map((tag) => ({ tag, key: tag })),
    key: post.slug,
    href: links.post.href({ slug: post.slug }),
  };
}

function mapRequestToPost({
  slug,
  data: { content, ...data },
}: ExtractClientResponse<typeof client.getPosts>[0]): PostsPropType {
  return {
    slug,
    ...data,
  };
}

function mapPostsToTags(posts: PostsPropType[]) {
  return [...new Set(posts.map(({ tags }) => tags).flat())];
}
