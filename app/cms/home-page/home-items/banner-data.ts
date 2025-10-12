import {
  collectionFile,
  GetCollectionType,
} from "@egvelho/next-meta/cms/collection";

export type BannerData = GetCollectionType<typeof bannerData>;

export const bannerData = collectionFile({
  file: "app/home/banner-data.json",
  label: "Banner",
}).fields((data) => ({
  textColor: data.color({
    label: "Cor de destaque",
  }),
  backgroundColor: data.color<"optional">({
    label: "Cor de fundo",
    required: false,
  }),
  backgroundImage: data.image({
    label: "Imagem de fundo",
  }),
}));
