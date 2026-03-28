import { Meta } from "app/meta";
import { links, pages } from "app/url";
import personalInfoData from "app/social-info/personal-info-data.json";
import { BannerSection } from "./banner-section";
import { BlogOverviewSection } from "./blog-overview-section";
import homeMetadata from "./home-metadata.json";
import itemsData from "./items-data.json";

const itemsSections = {
  bannerData: BannerSection,
  blogOverviewData: BlogOverviewSection,
};

const itemsToDisplay = itemsData.items.map(({ item }, index) => {
  const Item = itemsSections[item as keyof typeof itemsSections];
  const key = index;
  return { Item, key };
});

export const Home = pages.index.page(({ blogOverviewSection }) => {
  return (
    <>
      <Meta
        title={homeMetadata.title}
        description={homeMetadata.description || personalInfoData.about}
        image={homeMetadata.image}
        keywords={homeMetadata.keywords}
        url={links.index.href}
      />
      {itemsToDisplay.map(({ Item, key }) => (
        <Item
          key={key}
          {...blogOverviewSection}
          bannerContent={blogOverviewSection.list[0].title ?? ""}
          bannerLink={blogOverviewSection.list[0].href ?? ""}
        />
      ))}
      <style jsx global>{`
        #contato .MuiListItem-root {
          gap: 8px;
        }

        #contato .MuiAvatar-circular {
          width: 96px;
          height: 96px;
        }
        #contato .MuiListItemText-root {
          align-self: center;
        }
      `}</style>
    </>
  );
});
