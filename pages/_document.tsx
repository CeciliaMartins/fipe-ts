import Document, { DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,700&display=swap');

html,
body {
  padding: 0;
  margin: 0;
  font-family: "Poppins", sans-serif;

 
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

`;

export default class _document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <GlobalStyle></GlobalStyle>
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}