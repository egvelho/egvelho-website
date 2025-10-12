import * as collectionUtils from "@egvelho/next-meta/cms/collection-utils";
import paths from "app/cms/paths.json";
import type { BlogPost } from "app/cms/blog-post";

export async function getAllPosts() {
  const postsPath = await collectionUtils.useCollectionFolder(paths.posts, {
    createFolderIfNotExists: true,
  });
  const posts = await collectionUtils.getCollectionFolder<BlogPost>(postsPath);
  const sortByMostRecentPosts = collectionUtils.sortByMostRecent<BlogPost>(
    ({ data: { publishDate } }) => new Date(publishDate ?? 0)
  );

  return posts.sort(sortByMostRecentPosts);
}
