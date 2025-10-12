import { useContext, ReactNode } from "react";
import { useRouter } from "next/router";
import {
  Dash as MuiDash,
  DashProps as MuiDashProps,
} from "@egvelho/next-mui/dash/dash";
import { useViewport } from "@egvelho/next-mui/utils/use-viewport";
import { isColorDark } from "@egvelho/next-mui/utils/is-color-dark";
import { icons } from "@egvelho/next-mui/icons";
import { links } from "app/url";
import { Context } from "app/context";
import colors from "app/colors.json";
import appConfig from "app.json";
import dashColors from "./dash-colors.json";
import dashItems from "./dash-items.json";
import { getSocialInfo } from "app/social-info/get-social-info";

const texts = {
  appBarItemsAriaLabel: "Links do cabeçalho",
  drawerButtonAriaLabel: "Abrir menu de navegação",
  drawerItemsAriaLabel: "Links do menu de navegação",
  footerItemsAriaLabel: "Links do rodapé",
  footerSocialIconsText: "Contatos e plataformas digitais",
  loginLabel: "Entrar",
  createAccountLabel: "Criar conta",
  logoutLabel: "Sair",
  linkedInIconAriaLabel: "LinkedIn",
};

const logo = "/icon.svg";

const appBarItems = mapFilterItemsToLinks(dashItems.appBar).map(
  (item, key) => ({
    key,
    href: item.href as string,
    label: item.longLabel,
  })
);

const footerItems = mapFilterItemsToLinks(dashItems.footer).map(
  (item, key) => ({
    key,
    href: item.href as string,
    label: item.longLabel,
  })
);

const bottomNavigationItems = mapFilterItemsToLinks(
  dashItems.bottomNavigation
).map((item, key) => ({
  key,
  href: item.href as string,
  label: item.label,
  Icon: item.Icon,
}));

const drawerItems = mapFilterItemsToLinks(dashItems.drawer).map(
  (item, key) => ({
    key,
    href: item.href as string,
    label: item.longLabel,
    Icon: item.Icon,
  })
);

const appBarActions = [
  {
    key: "contact-action",
    href: links.contact.href,
    label: links.contact.longLabel,
  },
];

export interface DashProps {
  children: ReactNode;
  snackbarContent: MuiDashProps["snackbarContent"];
  setSnackbarContent: MuiDashProps["setSnackbarContent"];
}

export function Dash({
  children,
  snackbarContent,
  setSnackbarContent,
}: DashProps) {
  const { useIsLaptop } = useViewport();
  const isLaptop = useIsLaptop();

  const { context, setContext } = useContext(Context);

  const footerBackgroundColor =
    dashColors.footerBackgroundColor || appConfig.secondaryColor;
  const footerBackgroundColorIsDark = isColorDark(footerBackgroundColor);

  const footerColor =
    dashColors.footerColor ||
    (footerBackgroundColorIsDark ? colors.white : colors.black);

  const socialIconsProps = {
    isMe: true,
    smallIcons: true,
    lightIcons: footerBackgroundColorIsDark,
    ...getSocialInfo(),
  };

  const appBarIcons =
    typeof socialIconsProps.linkedIn === "string"
      ? [
          {
            key: "linkedin",
            Icon: icons.LinkedIn,
            href: socialIconsProps.linkedIn,
            ariaLabel: texts.linkedInIconAriaLabel,
          },
        ]
      : [];

  return (
    <MuiDash
      backgroundColor={appConfig.backgroundColor}
      snackbarContent={snackbarContent}
      setSnackbarContent={setSnackbarContent}
      shortName={isLaptop ? undefined : appConfig.shortName}
      logo={logo}
      appBarColor={dashColors.appBarColor || appConfig.primaryColor}
      appBarBackgroundColor={appConfig.dashColor}
      footerColor={footerColor}
      footerBackgroundColor={footerBackgroundColor}
      drawerOpen={context.drawerOpen}
      setDrawerOpen={(drawerOpen) => setContext({ drawerOpen })}
      appBarActions={isLaptop ? appBarActions : []}
      appBarItems={appBarItems}
      appBarIcons={appBarIcons}
      footerItems={footerItems}
      bottomNavigationItems={bottomNavigationItems}
      drawerItems={drawerItems}
      {...socialIconsProps}
      {...texts}
    >
      {children}
    </MuiDash>
  );
}

function mapFilterItemsToLinks(items: { page: string }[]) {
  return items.map(({ page }) => links[page as keyof typeof links]);
}
