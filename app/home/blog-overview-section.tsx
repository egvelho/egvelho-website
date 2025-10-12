import {
  BlogOverview,
  BlogOverviewProps,
} from "@egvelho/next-mui/section/blog-overview";
import { showDate } from "app/cms/show-date";
import { links } from "app/url";
import colors from "app/colors.json";
import blogOverviewData from "./blog-overview-data.json";

const texts = {
  cardsTitleOverlineText: "Área profissional e acadêmica",
  cardsTitle: "Trabalhos em destaque",
  listTitleOverlineText: "Conhecer mais",
  listTitle: "Últimas postagens",
  blogHrefButtonLabel: "Ver todas as postagens",
};

export interface BlogOverviewSectionProps {
  cards: (Omit<BlogOverviewProps["list"][0], "date" | "dateText"> & {
    encodedDate: string;
  })[];
  list: (Omit<BlogOverviewProps["list"][0], "date" | "dateText"> & {
    encodedDate: string;
  })[];
}

export function BlogOverviewSection({ cards, list }: BlogOverviewSectionProps) {
  return (
    <section id="blog-overview">
      <BlogOverview
        color={blogOverviewData.titleColor}
        background={blogOverviewData.backgroundColor || colors.white}
        titleColor={blogOverviewData.titleColor}
        blogHref={links.blog.href}
        cards={cards.map(({ encodedDate, ...item }) => ({
          date: new Date(encodedDate),
          dateText: showDate(new Date(encodedDate)),
          ...item,
        }))}
        list={list.map(({ encodedDate, ...item }) => ({
          date: new Date(encodedDate),
          dateText: showDate(new Date(encodedDate)),
          ...item,
        }))}
        {...texts}
      />
    </section>
  );
}
