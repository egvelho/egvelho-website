import { env } from "app/env";

export async function scripts() {
  const loadedEnv = env();
  const outPath = "public";

  if (loadedEnv.nodeEnv === "production" || loadedEnv.runScriptsInDevelopment) {
    const { generateSitemap } = await import(
      "@egvelho/next-meta/utils/generate-sitemap"
    );
    const { generateAssets } = await import(
      "@egvelho/next-meta/utils/generate-assets"
    );
    const { resizeImageAssets } = await import(
      "@egvelho/next-meta/utils/resize-image-assets"
    );

    await Promise.all([
      loadedEnv.generateAssetsOnBuild
        ? generateAssets({ appPath: "app.json", outPath })
        : undefined,
      loadedEnv.resizeImageAssetsOnBuild
        ? resizeImageAssets({
            paths: ["public/images"],
            size: 256,
          })
        : undefined,
      generateSitemap({
        mapPathToImport: (path) => import(`pages/${path}`),
        outPath,
      }),
    ]);
  }
}
