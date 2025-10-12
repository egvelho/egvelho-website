import { ReactNode, useContext } from "react";
import { app } from "@egvelho/next-mui/app";
import { Meta, MetaProps } from "@egvelho/next-meta/meta/meta";
import { createTheme } from "@egvelho/next-mui/utils/create-theme";
import { ContextProvider, Context } from "app/context";
import { Dash } from "app/dash/dash";
import { links } from "app/url";
import appConfig from "app.json";
import Head from "next/head";
import "@egvelho/next-mui/typography/typography.css";
import "@fontsource/vt323";

const metaImage = "/android-chrome-512x512.png";

const theme = createTheme({
  primaryColor: appConfig.primaryColor,
  secondaryColor: appConfig.secondaryColor,
  backgroundColor: appConfig.backgroundColor,
});

function Layout({ children }: { children: ReactNode }) {
  return (
    <ContextProvider>
      <NestedLayout>{children}</NestedLayout>
    </ContextProvider>
  );
}

function NestedLayout({ children }: { children: ReactNode }) {
  const { context, setContext } = useContext(Context);

  return (
    <>
      <Meta
        {...(appConfig as MetaProps)}
        url={links.index.href}
        image={metaImage}
        keywords={[]}
      />
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <Dash
        snackbarContent={context.snackbarContent}
        setSnackbarContent={(snackbarContent) =>
          setContext({ snackbarContent })
        }
      >
        {children}
      </Dash>
    </>
  );
}

export default app({
  Layout,
  theme,
});
