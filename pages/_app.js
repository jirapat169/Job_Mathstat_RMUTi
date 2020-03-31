import App from "next/app";
import { Provider } from "react-redux";
import React from "react";
import { store } from "../app/redux";
import withRedux from "next-redux-wrapper";
import firebase from "firebase/app";
import LinearProgress from "@material-ui/core/LinearProgress";
import "firebase/database";
import "firebase/storage";
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
      db: null,
      storageUpload: null,
      storageRemove: null
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
        },
        storageUpload: (file, event) => {
          var storageRef = firebase.storage().ref();
          var uploadTask = storageRef
            .child(`/mathstat/${new Date().getTime()}`)
            .put(file);
          uploadTask.on(
            "state_changed",
            function(snapshot) {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                  event({ progress: progress, status: "Upload is paused" });
                  break;
                case firebase.storage.TaskState.RUNNING:
                  event({ progress: progress, status: "Upload is running" });
                  break;
              }
            },
            function(error) {
              event({ upload: false, status: error.code });
            },
            function() {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function(downloadURL) {
                  event({ upload: true, status: downloadURL });
                });
            }
          );
        },
        storageRemove: url => {
          var storageRef = firebase.storage().refFromURL(url);
          return new Promise(resolve => {
            storageRef
              .delete()
              .then(value => {
                resolve({ delete: true, status: value });
              })
              .catch(reason => {
                resolve({ delete: false, status: reason });
              });
          });
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
          storageUpload={this.state.storageUpload}
          storageRemove={this.state.storageRemove}
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
        <script
          src={`${basePath()}assets/js/Froala/froala_editor.pkgd.min.js`}
        ></script>
        <script
          src={`${basePath()}assets/js/Froala/plugins.pkgd.min.js`}
        ></script>
      </Provider>
    );
  }
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
