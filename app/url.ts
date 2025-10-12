import { slugify } from "@egvelho/next-meta/utils/slugify";
import { link } from "@egvelho/next-meta/url/link";
import { endpoint } from "@egvelho/next-meta/url/endpoint";
import { getAxiosClient } from "@egvelho/next-meta/url/get-axios-client";
import { getPages } from "@egvelho/next-meta/url/get-pages";
import { icons } from "@egvelho/next-mui/icons";
import type { PostPageProps } from "@egvelho/next-mui/post-page/post-page";
import type { Data } from "@egvelho/next-meta/cms/collection-types";
import type { BlogPost } from "app/cms/blog-post";
import type { BlogOverviewSectionProps } from "app/home/blog-overview-section";
import { getContext } from "app/context";

export type { ExtractPageProps } from "@egvelho/next-meta/url/get-pages";
export type { ExtractClientResponse } from "@egvelho/next-meta/url/get-axios-client";

interface WithSlug {
  slug: string;
}

type Home = { blogOverviewSection: BlogOverviewSectionProps };

interface Blog {
  postsLength: number;
  posts: (Omit<BlogPost, "content"> & WithSlug)[];
  tags: string[];
  initialTag?: string;
}

export const links = {
  index: link<Home>("/", icons.Home, "Home", "Página inicial"),
  blog: link<Blog, { tag?: string }>(
    "/postagens",
    icons.RssFeed,
    "Postagens",
    "Acessar postagens"
  ),
  blogTag: link<{}, { tag: string }, "withQuery">(
    ({ tag }) => `/postagens/tag/${slugify(tag)}`,
    icons.RssFeed,
    "Tag"
  ),
  datasets: link(
    "/postagens/tag/datasets",
    icons.CloudDownload,
    "Datasets",
    "Datasets publicados"
  ),
  research: link(
    "/postagens/tag/pesquisa",
    icons.Description,
    "Pesquisa",
    "Pesquisa científica"
  ),
  openSource: link(
    "/postagens/tag/open-source",
    icons.Code,
    "Open-source",
    "Projetos open-source"
  ),
  post: link<
    BlogPost &
      WithSlug & {
        recommendedPosts: PostPageProps["recommendedPosts"];
      },
    { slug: string },
    "withQuery"
  >(
    ({ slug }) => `/postagens/${slug}`,
    icons.Comment,
    "Postagem",
    "Ver postagem"
  ),
  contact: link("/#contato", icons.Email, "Contato", "Entrar em contato"),
  cms: link("/cms", icons.SupervisedUserCircle, "CMS"),
};

export const endpoints = {
  getPosts: endpoint<{ page: string }, Data<BlogPost>[]>(
    "GET",
    "/static-api/posts/[page].json"
  ),
  getPostsForTag: endpoint<{ tag: string }, Data<BlogPost>[]>(
    "GET",
    "/static-api/posts-by-tag/[tag].json"
  ),
};

export const pages = getPages(links);

export const client = getAxiosClient({
  endpoints,
  async beforeRequest() {
    getContext().setContext({ loading: true });
  },
  async afterRequest() {
    getContext().setContext({ loading: false });
  },
});
