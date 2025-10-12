import { collectionFile } from "@egvelho/next-meta/cms/collection";

export const personalInfoData = collectionFile({
  file: "app/social-info/personal-info-data.json",
  label: "Informações pessoais",
}).fields((data) => ({
  name: data.string({
    label: "Nome",
  }),
  fullName: data.string({
    label: "Nome completo",
  }),
  description: data.string({
    label: "Descrição",
  }),
  about: data.text({
    label: "Currículo",
  }),
  image: data.image({
    label: "Imagem",
  }),
  keywords: data.keywords({
    label: "Palavras-chave",
    min: 1,
    max: 5,
  }),
}));
