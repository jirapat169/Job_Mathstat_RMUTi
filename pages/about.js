import React from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../app/redux";

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var urlParams = new window.URLSearchParams(window.location.search);
    console.log(urlParams.get("text"));
  }

  render() {
    return <div>About</div>;
  }
}

export default connect(mapStateToProps)(About);
