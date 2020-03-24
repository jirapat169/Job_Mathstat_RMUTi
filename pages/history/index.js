import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../../app/redux";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";

class History extends Component {
  render() {
    return (
      <>
        <HtmlHead prefixTitle="เกี่ยวกับสาขา" afterPath="history" />
        <DefaultLayout>History</DefaultLayout>
      </>
    );
  }
}

export default connect(mapStateToProps)(History);
