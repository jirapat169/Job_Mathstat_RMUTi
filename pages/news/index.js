import React, { Component } from "react";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: null
    };
  }

  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("news");
    console.log(myParam);

    await this.props.delay(300);
    this.props.db(`/news/${myParam}`).on("value", value => {
      // let items = [];

      // if (value.val()) {
      //   Object.keys(value.val()).forEach((element, index) => {
      //     items.push({ ...value.val()[element], key: element });
      //   });
      //   items.sort((a, b) => (b.timeUpdate >= a.timeUpdate ? 1 : -1));
      // }

      // this.setState({ newsItems: items });
      this.setState({ newsData: value.val() });
    });
  }

  componentDidUpdate() {
    if (this.state.newsData)
      window.$("#contentNews").html(this.state.newsData.newsData);
  }

  render() {
    return (
      <>
        <HtmlHead />
        <DefaultLayout>
          {(() => {
            if (this.state.newsData) {
              return (
                <>
                  <div className="mb-3">
                    <h5>
                      <b>{this.state.newsData.name}</b>
                    </h5>
                  </div>

                  {/* <div className="text-center mb-3">
                    <img src={this.state.newsData.imgPath} width="200px" />
                  </div> */}

                  <div className="mb-3">
                    <div id="contentNews" className="fr-view"></div>
                  </div>
                </>
              );
            } else {
              return (
                <div className="spinner-border text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              );
            }
          })()}
        </DefaultLayout>
      </>
    );
  }
}
