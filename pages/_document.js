import Document, { Html, Head, Main, NextScript } from "next/document";
const basePath = require("./../base_path");

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
        <Head>
          <link
            rel="stylesheet"
            href={`${basePath()}assets/css/Material_Icon/material-icons.css`}
          />
          <link
            rel="stylesheet"
            href={`${basePath()}assets/css/notfound.css`}
          />
          <link
            rel="stylesheet"
            href={`${basePath()}assets/css/bootstrap.min.css`}
          />
          <link
            rel="stylesheet"
            href={`${basePath()}assets/css/Font_Promp/promp.css`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src={`${basePath()}assets/js/all.js`} defer></script>
          <script
            src={`${basePath()}assets/js/jquery-3.4.1.slim.min.js`}
          ></script>
          <script
            src={`${basePath()}assets/js/bootstrap.bundle.min.js`}
          ></script>
          <script src={`${basePath()}assets/js/secure-ls.min.js`}></script>
          <script src={`${basePath()}assets/js/underscore-min.js`}></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
