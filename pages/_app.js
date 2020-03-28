import App from "next/app";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../app/redux";
import withRedux from "next-redux-wrapper";
import firebase from "firebase/app";
import LinearProgress from "@material-ui/core/LinearProgress";
import "firebase/database";
import "../app/style.scss";
import { Router } from "next/router";
import AppRedux from "../app/redux/app-redux";

const basePath = require("./../base_path");
const configFirebase = {
  apiKey: "AIzaSyCONB0piLBtDWrd0X6EQM3X4j5GfhUD5Vc",
  authDomain: "myapp-c233c.firebaseapp.com",
  databaseURL: "https://myapp-c233c.firebaseio.com",
  projectId: "myapp-c233c",
  storageBucket: "myapp-c233c.appspot.com",
  messagingSenderId: "718102188961",
  appId: "1:718102188961:web:9f9d7084e872ad3da6b1e0"
};

const delay = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      pageLoad: true,
      pageDelay: 500,
      db: null
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ pageLoad: false });
    }, this.state.pageDelay);

    Router.events.on("routeChangeStart", () => {
      this.setState({ pageLoad: true });
    });

    Router.events.on("routeChangeComplete", () => {
      setTimeout(() => {
        this.setState({ pageLoad: false });
      }, this.state.pageDelay);
    });

    Router.events.on("routeChangeError", () => {
      setTimeout(() => {
        this.setState({ pageLoad: false });
      }, this.state.pageDelay);
    });

    if (!firebase.apps.length) {
      firebase.initializeApp(configFirebase);
      this.setState({
        db: (path = "") => {
          return firebase.database().ref(`/mathstat${path}`);
        }
      });
    }
  }

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
        <div
          style={{
            position: "absolute",
            width: "100%",
            zIndex: "9999",
            display: `${this.state.pageLoad ? "block" : "none"}`
          }}
        >
          <LinearProgress />
        </div>

        <AppRedux
          {...pageProps}
          {...this.props}
          db={this.state.db}
          delay={delay}
        >
          <Component />
        </AppRedux>

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
