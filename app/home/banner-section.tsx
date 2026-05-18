import { useViewport } from "@egvelho/next-mui/utils/use-viewport";
import { BannerWithCard } from "@egvelho/next-mui/section/banner-with-card";
import { SocialCard } from "@egvelho/next-mui/social-page/social-card";
import { getSocialInfo } from "app/social-info/get-social-info";
import personalInfoData from "app/social-info/personal-info-data.json";
import colors from "app/colors.json";
import bannerData from "./banner-data.json";

const texts = {
  bannerTitle: "Mais recente",
  bannerButtonLabel: "Acessar postagem",
};

export interface BannerSectionProps {
  bannerContent: string;
  bannerLink: string;
}

export function BannerSection({
  bannerContent,
  bannerLink,
}: BannerSectionProps) {
  const { useIsPhone } = useViewport();
  const isPhone = useIsPhone();

  return (
    <section id="contato">
      <BannerWithCard
        title={texts.bannerTitle}
        content={bannerContent}
        backgroundColor={bannerData.backgroundColor || colors.white}
        color={bannerData.textColor}
        backgroundImage={bannerData.backgroundImage}
        actions={[{ key: 1, label: texts.bannerButtonLabel, href: bannerLink }]}
        card={
          <SocialCard
            elevation={16}
            name={personalInfoData.fullName}
            description={personalInfoData.description}
            about={personalInfoData.about}
            picture={personalInfoData.image}
            tags={personalInfoData.keywords.map((tag) => ({ tag, key: tag }))}
            isMe
            smallIcons
            darkIcons
            {...getSocialInfo()}
          />
        }
      />
      <style jsx global>{`
        #banner h1 {
          text-transform: lowercase;
          font-family: "VT323";
          font-size: ${isPhone ? "2.7rem" : "3.3rem"};
          letter-spacing: ${isPhone ? "4px" : "6px"};
        }
      `}</style>
    </section>
  );
}
