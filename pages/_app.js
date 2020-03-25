import App from "next/app";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../app/redux";
import withRedux from "next-redux-wrapper";
import firebase from "firebase/app";
import LinearProgress from "@material-ui/core/LinearProgress";
import "firebase/database";
import "../app/style.scss";
import { Router } from "next/dist/client/router";

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      pageLoad: true,
      pageDelay: 500
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
        <Component
          {...pageProps}
          {...this.props}
          db={firebase.database().ref("/news")}
        />
      </Provider>
    );
  }
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
