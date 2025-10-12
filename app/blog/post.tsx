import { PostPage } from "@egvelho/next-mui/post-page/post-page";
import { Markdown } from "@egvelho/next-mui/components/markdown";
import { ClientRender } from "@egvelho/next-mui/components/client-render";
import { truncateString } from "@egvelho/next-mui/utils/truncate-string";
import { isColorDark } from "@egvelho/next-mui/utils/is-color-dark";
import { useViewport } from "@egvelho/next-mui/utils/use-viewport";
import { showDate } from "app/cms/show-date";
import { links, pages } from "app/url";
import { Meta } from "app/meta";
import colors from "app/colors.json";
import appConfig from "app.json";
import personalInfoData from "app/social-info/personal-info-data.json";

const texts = {
  socialAnchorTitle: "Compartilhar em",
  socialIconsText: "Compartilhar em",
};

export const Post = pages.post.page(
  ({
    title,
    titleColor,
    description,
    image,
    publishDate,
    slug,
    tags,
    authorName,
    authorDescription,
    authorPicture,
    backgroundColor,
    backgroundImage,
    content,
    recommendedPosts,
  }) => {
    const { useIsLaptop } = useViewport();
    const isLaptop = useIsLaptop();
    const isDefaultAuthor = !authorName && !authorDescription && !authorPicture;

    const background = backgroundImage
      ? `url(${backgroundImage})`
      : backgroundColor || appConfig.secondaryColor;

    const darkIcons = isColorDark(background) ? undefined : true;
    const lightIcons = darkIcons ? undefined : true;

    const publishDateTime =
      (publishDate !== undefined && new Date(publishDate)) || undefined;

    return (
      <>
        <Meta
          title={title}
          description={description}
          image={image}
          keywords={tags}
          url={links.post.href({ slug })}
        />
        <PostPage
          socialAnchorTitle={texts.socialAnchorTitle}
          socialIconsText={texts.socialIconsText}
          facebook
          linkedIn
          twitter
          whatsApp
          darkIcons={darkIcons}
          lightIcons={lightIcons}
          title={title}
          titleColor={titleColor}
          description={description}
          pageBackground={colors.white}
          background={background}
          authorName={isDefaultAuthor ? personalInfoData.name : authorName}
          authorDescription={
            isDefaultAuthor ? personalInfoData.description : authorDescription
          }
          authorPicture={
            isDefaultAuthor ? personalInfoData.image : authorPicture
          }
          recommendedPosts={recommendedPosts}
          date={publishDateTime}
          dateText={
            <ClientRender>
              {publishDateTime ? showDate(publishDateTime) : ""}
            </ClientRender>
          }
          tags={tags.map((tag) => ({
            key: tag,
            tag,
            href: links.blogTag.href({ tag }),
          }))}
          breadcrumbs={[
            { key: "index", label: links.index.label, href: links.index.href },
            { key: "blog", label: links.blog.label, href: links.blog.href },
            {
              key: "post",
              label: truncateString(title, isLaptop ? 12 : 7),
              href: links.post.href({ slug }),
            },
          ]}
        >
          <article>
            <Markdown content={content} />
          </article>
        </PostPage>
      </>
    );
  }
);
