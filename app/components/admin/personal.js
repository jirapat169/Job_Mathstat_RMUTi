import React, { Component } from "react";

export default class Personal extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.db("/personal").on("value", value => {
      console.log(value.val());
    });
  }

  render() {
    return <div>Personal</div>;
  }
}
