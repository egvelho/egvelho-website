import type { SocialIconsProps } from "@egvelho/next-mui/components/social-icons";
import socialInfoData from "./social-info-data.json";

export function getSocialInfo() {
  const socialInfo: Partial<SocialIconsProps> = {
    facebook: socialInfoData.facebook,
    instagram: socialInfoData.instagram,
    twitter: socialInfoData.twitter,
    linkedIn: socialInfoData.linkedIn,
    youTube: socialInfoData.youTube,
    gitHub: socialInfoData.gitHub,
    lattes: socialInfoData.lattes,
    whatsApp: socialInfoData.whatsApp,
    email: socialInfoData.email,
  };

  const keysMap = Object.keys(socialInfo).map((key) => [
    key.toLowerCase(),
    key,
  ]);

  const showMap = Object.entries(socialInfoData)
    .filter(([key, value]) => value && key.startsWith("show"))
    .map(([key]) => key.toLowerCase());

  keysMap
    .filter(([key]) => !showMap.some((showKey) => showKey.includes(key)))
    .forEach(([, key]) => {
      delete socialInfo[key as keyof typeof socialInfo];
    });

  return socialInfo;
}
