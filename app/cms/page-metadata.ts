import { collectionFile } from "@egvelho/next-meta/cms/collection";

export function pageMetadata({ file }: { file: string }) {
  return collectionFile({
    file,
    label: "Metadados da página",
  }).fields((data) => ({
    title: data.string<"optional">({
      label: "Título",
      required: false,
    }),
    description: data.string<"optional">({
      label: "Descrição",
      required: false,
    }),
    image: data.image<"optional">({
      label: "Imagem",
      required: false,
    }),
    keywords: data.keywords({
      label: "Palavras-chave",
      min: 0,
      max: 5,
    }),
  }));
}
