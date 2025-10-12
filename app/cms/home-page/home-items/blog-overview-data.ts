import {
  collectionFile,
  GetCollectionType,
} from "@egvelho/next-meta/cms/collection";

export type BlogOverviewData = GetCollectionType<typeof blogOverviewData>;

export const blogOverviewData = collectionFile({
  file: "app/home/blog-overview-data.json",
  label: "Visão geral do blog",
}).fields((data) => ({
  titleColor: data.color<"optional">({
    label: "Cor de destaque",
    required: false,
  }),
  backgroundColor: data.color<"optional">({
    label: "Cor de fundo",
    required: false,
  }),
}));
