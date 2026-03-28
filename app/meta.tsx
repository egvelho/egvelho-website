import { MetaTitle } from "@egvelho/next-meta/meta/title";
import { MetaDescription } from "@egvelho/next-meta/meta/description";
import { MetaKeywords } from "@egvelho/next-meta/meta/keywords";
import { MetaImage } from "@egvelho/next-meta/meta/image";
import { MetaPageUrl } from "@egvelho/next-meta/meta/page-url";
import app from "app.json";
import { env } from "app/env";
import personalInfoData from "app/social-info/personal-info-data.json";

const domain = env().url;
const metaImage = "/android-chrome-512x512.png";

export type MetaProps = {
  title?: string;
  description?: string;
  url: string;
  image?: string;
  keywords: string[];
};

export function Meta({ title, description, url, image, keywords }: MetaProps) {
  const imageUrl = new URL(image || metaImage, domain).href;
  const pageUrl = new URL(url, domain).href;

  return (
    <>
      <MetaTitle title={title || app.name} />
      <MetaDescription description={description || app.description} />
      <MetaKeywords
        keywords={keywords.length < 0 ? personalInfoData.keywords : keywords}
      />
      <MetaImage image={imageUrl} />
      <MetaPageUrl url={pageUrl} />
    </>
  );
}
