import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="th">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
