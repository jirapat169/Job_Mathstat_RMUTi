import App from "next/app";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../app/redux";
import withRedux from "next-redux-wrapper";
import firebase from "firebase/app";
import "firebase/database";

import "../app/style.scss";

const basePath = require("./../base_path");
const settings = { timestampsInSnapshots: true };

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
    const config = {
      apiKey: "AIzaSyCONB0piLBtDWrd0X6EQM3X4j5GfhUD5Vc",
      authDomain: "myapp-c233c.firebaseapp.com",
      databaseURL: "https://myapp-c233c.firebaseio.com",
      projectId: "myapp-c233c",
      storageBucket: "myapp-c233c.appspot.com",
      messagingSenderId: "718102188961",
      appId: "1:718102188961:web:9f9d7084e872ad3da6b1e0"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    return (
      <Provider store={store}>
        <Component
          {...pageProps}
          {...this.props}
          db={firebase.database().ref("/news")}
        />
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
