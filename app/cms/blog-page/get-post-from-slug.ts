import path from "path";
import * as collectionUtils from "@egvelho/next-meta/cms/collection-utils";
import paths from "app/cms/paths.json";
import type { BlogPost } from "app/cms/blog-post";

export async function getPostFromSlug(slug: string) {
  const postPath = await collectionUtils.useCollectionFile(
    path.join(paths.posts, `${slug}.json`)
  );
  const post = await collectionUtils.getCollectionFile<BlogPost>(postPath);
  return post;
}
