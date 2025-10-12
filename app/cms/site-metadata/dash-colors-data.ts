import {
  collectionFile,
  GetCollectionType,
} from "@egvelho/next-meta/cms/collection";

export type DashColorsData = GetCollectionType<typeof dashColorsData>;

export const dashColorsData = collectionFile({
  file: "app/dash/dash-colors.json",
  label: "Cores da dash",
}).fields((data) => ({
  appBarColor: data.color<"optional">({
    label: "Cor do texto da barra superior",
    allowInput: true,
    required: false,
  }),
  footerColor: data.color<"optional">({
    label: "Cor do texto do rodapé",
    allowInput: true,
    required: false,
  }),
  footerBackgroundColor: data.color<"optional">({
    label: "Cor de fundo do rodapé",
    allowInput: true,
    required: false,
  }),
}));
