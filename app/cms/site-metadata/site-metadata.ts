import { collectionFiles } from "@egvelho/next-meta/cms/collection";
import { appMetadata } from "./app-metadata";
import { dashColorsData } from "./dash-colors-data";
import { dashItemsData } from "./dash-items-data";
import { socialInfoData } from "./social-info-data";
import { personalInfoData } from "./personal-info-data";

export const siteMetadata = collectionFiles({
  label: "Geral",
  collections: [
    appMetadata,
    dashColorsData,
    dashItemsData,
    socialInfoData,
    personalInfoData,
  ],
});
