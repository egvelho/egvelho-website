import { collectionFile } from "@egvelho/next-meta/cms/collection";

export const socialInfoData = collectionFile({
  file: "app/social-info/social-info-data.json",
  label: "Contato e mídias sociais",
}).fields((data) => ({
  facebook: data.string<"optional">({
    label: "Facebook",
    required: false,
    pattern: ["https://facebook.com/(.*)", "Formato inválido"],
  }),
  showFacebook: data.boolean({
    label: "Mostrar Facebook",
    defaultValue: false,
  }),
  instagram: data.string<"optional">({
    label: "Instagram",
    required: false,
    pattern: ["https://instagram.com/(.*)", "Formato inválido"],
  }),
  showInstagram: data.boolean({
    label: "Mostrar Instagram",
    defaultValue: false,
  }),
  twitter: data.string<"optional">({
    label: "Twitter",
    required: false,
    pattern: ["https://twitter.com/(.*)", "Formato inválido"],
  }),
  showTwitter: data.boolean({
    label: "Mostrar Twitter",
    defaultValue: false,
  }),
  linkedIn: data.string<"optional">({
    label: "LinkedIn",
    required: false,
    pattern: ["https://linkedin.com/in/(.*)", "Formato inválido"],
  }),
  showLinkedIn: data.boolean({
    label: "Mostrar LinkedIn",
    defaultValue: false,
  }),
  youTube: data.string<"optional">({
    label: "YouTube",
    required: false,
    pattern: ["https://youtube.com/(.*)", "Formato inválido"],
  }),
  showYouTube: data.boolean({
    label: "Mostrar YouTube",
    defaultValue: false,
  }),
  gitHub: data.string<"optional">({
    label: "GitHub",
    required: false,
    pattern: ["https://github.com/(.*)", "Formato inválido"],
  }),
  showGitHub: data.boolean({
    label: "Mostrar GitHub",
    defaultValue: false,
  }),
  lattes: data.string<"optional">({
    label: "Lattes",
    required: false,
    pattern: ["https://lattes.cnpq.br/(.*)", "Formato inválido"],
  }),
  showLattes: data.boolean({
    label: "Mostrar Lattes",
    defaultValue: false,
  }),
  whatsApp: data.string<"optional">({
    label: "WhatsApp",
    required: false,
    pattern: ["\\d+", "Formato inválido"],
  }),
  showWhatsApp: data.boolean({
    label: "Mostrar WhatsApp",
    defaultValue: false,
  }),
  email: data.string<"optional">({
    label: "Email",
    required: false,
    pattern: ["(.*)@(.*)", "Formato inválido"],
  }),
  showEmail: data.boolean({
    label: "Mostrar Email",
    defaultValue: false,
  }),
}));
