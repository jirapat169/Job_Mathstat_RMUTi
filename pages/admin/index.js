import React, { Component } from "react";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";
import Router from "next/router";
import AppService from "../../app/services/app-service";
import Login from "../../app/components/admin/login";

const basePath = require("./../../base_path");

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onLogin: false
    };
  }

  componentDidMount() {
    AppService.localStorage().clear();
    if (AppService.localStorage().get("userlogin") == null) {
      // Router.push(`/admin/login`, `${basePath()}admin/login`);
      this.setState({ onLogin: false });
    } else {
      this.setState({ onLogin: true });
    }
  }

  render() {
    return (
      <>
        <HtmlHead prefixTitle="ผู้ดูแลระบบ" path="admin" />
        <DefaultLayout>
          {(() => {
            if (this.state.onLogin) {
              return (
                <div className="row">
                  <div className="col-lg-3">เมนู</div>
                  <div className="col-lg-auto">Admin</div>
                </div>
              );
            } else {
              return <Login />;
            }
          })()}
        </DefaultLayout>
      </>
    );
  }
}
