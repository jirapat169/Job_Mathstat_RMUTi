import React, { Component } from "react";

export default class News extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.db("/news").on("value", value => {
      console.log(value.val());
    });
  }

  render() {
    return <div>News</div>;
  }
}
