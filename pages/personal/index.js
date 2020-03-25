import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../../app/redux";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";

class Personal extends Component {
  render() {
    return (
      <>
        <HtmlHead prefixTitle="คณาจารย์และเจ้าหน้าที่" path="personal" />
        <DefaultLayout>
          <span>Personal</span>
        </DefaultLayout>
      </>
    );
  }
}

export default connect(mapStateToProps)(Personal);
