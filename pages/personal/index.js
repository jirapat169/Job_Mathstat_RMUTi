import React, { Component } from "react";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";

export default class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <HtmlHead prefixTitle="คณาจารย์และเจ้าหน้าที่" path="personal" />
        <DefaultLayout>
          <h5>
            <b>คณาจารย์และเจ้าหน้าที่</b>
          </h5>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div>Hello</div>
            </div>
          </div>
        </DefaultLayout>
      </>
    );
  }
}
