import React, { Component } from "react";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";
import AppService from "../../app/services/app-service";
import Login from "../../app/components/admin/login";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onLogin: false
    };
  }

  componentDidMount() {
    // AppService.localStorage().clear();
    if (AppService.localStorage().get("userlogin") == null) {
      this.setState({ onLogin: false });
    } else {
      this.setState({ onLogin: true });
    }
  }

  render() {
    return (
      <>
        <DefaultLayout>
          {(() => {
            if (this.state.onLogin) {
              return (
                <>
                  <HtmlHead prefixTitle="ผู้ดูแลระบบ" path="admin" />
                  <div className="row">
                    <div className="col-lg-3">เมนู</div>
                    <div className="col-lg-auto">Admin</div>
                  </div>
                </>
              );
            } else {
              return <Login {...this.props} />;
            }
          })()}
        </DefaultLayout>
      </>
    );
  }
}
