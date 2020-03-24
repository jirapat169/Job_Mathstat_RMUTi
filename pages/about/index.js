import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../../app/redux";

class About extends Component {
  render() {
    return <div>About 123</div>;
  }
}

export default connect(mapStateToProps)(About);
