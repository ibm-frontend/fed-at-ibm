import App, { Container } from "next/app";
import { createGlobalStyle } from "styled-components";
import Head from "next/head";
import plex from "@ibm/plex/css/ibm-plex.css";

import grid from "../utils/grid";
import Nav from "../components/Nav";

const GlobalStyle = createGlobalStyle`
  ${grid}
  ${plex}

  body {
    --color-accent: #70A126;
    --color-accent-hover: #567C1D;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-display: swap;
    font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
    font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  a {
    color: var(--color-accent);
    text-decoration: none;

    :hover {
      color: var(--color-accent-hover);
    }

    :focus {
      outline: none;
      text-decoration: underline;
      text-decoration-color: var(--color-accent);
    }

    :focus:hover {
      text-decoration-color: var(--color-accent-hover);
    }
  }
`;

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    // Get current page’s initial props
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <GlobalStyle />
        <Head>
          <title>FED@IBM</title>
        </Head>
        <Nav />
        <main className="ibm--grid">
          <Component {...pageProps} />
        </main>
      </Container>
    );
  }
}
