import App from "next/app";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../app/redux";
import withRedux from "next-redux-wrapper";
import "../app/style.scss";

const basePath = require("./../base_path");

class MyApp extends App {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    //Anything returned here can be access by the client
    return { pageProps: pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider store={store}>
        <Component {...pageProps} {...this.props} />
        <script src={`${basePath()}assets/js/all.js`} defer></script>
        <script
          src={`${basePath()}assets/js/jquery-3.4.1.slim.min.js`}
        ></script>
        <script src={`${basePath()}assets/js/bootstrap.bundle.min.js`}></script>
        <script src={`${basePath()}assets/js/secure-ls.min.js`}></script>
        <script src={`${basePath()}assets/js/underscore-min.js`}></script>
      </Provider>
    );
  }
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
