import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../../app/redux";

class Personal extends Component {
  render() {
    return <div>Personal 123</div>;
  }
}

export default connect(mapStateToProps)(Personal);
