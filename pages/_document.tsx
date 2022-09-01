import React from "react";
import { ServerStyleSheets } from "@material-ui/core";
import Document, {
  Head,
  Main,
  NextScript,
  Html
} from "next/document";

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
            <link rel="icon" href="/favicon.png" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
  
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });
  
    const initialProps = await Document.getInitialProps(ctx);
  
    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  };
