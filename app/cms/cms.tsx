import { Cms } from "@egvelho/next-meta/cms/cms";
import app from "app.json";
import { env } from "app/env";
import { pages } from "app/url";
import { siteMetadata } from "./site-metadata/site-metadata";
import { homePage } from "./home-page/home-page";
import { blogPage } from "./blog-page/blog-page";
import { blogPost } from "./blog-post";

export const cms = pages.cms.page(() => {
  const isProduction = env().nodeEnv === "production";

  return (
    <Cms
      locale={app.lang}
      backend={
        isProduction
          ? {
              name: "github",
              repo: env().gitRepo,
              branch: env().gitBranch,
              base_url: env().gitOAuthUrl,
              auth_endpoint: "api/auth",
            }
          : {
              name: "test-repo",
            }
      }
      collections={[siteMetadata, homePage, blogPage, blogPost.collection]}
    />
  );
});
