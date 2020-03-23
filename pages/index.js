import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../app/redux";
import Link from "next/link";
import { HtmlHead } from "../app/components/html-head";
import DefaultLayout from "../app/components/dafault-layout";

const basePath = require("./../base_path");

class Index extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <>
        <HtmlHead></HtmlHead>
        <DefaultLayout>สวัสดี</DefaultLayout>
      </>
    );
  }
}

export default connect(mapStateToProps)(Index);
