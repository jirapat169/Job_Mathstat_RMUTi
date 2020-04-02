import React, { Component } from "react";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";

export default class join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsItems: []
    };
  }

  async componentDidMount() {
    await this.props.delay(300);
    this.props.db("/news").on("value", value => {
      let items = [];

      if (value.val()) {
        Object.keys(value.val()).forEach((element, index) => {
          items.push({ ...value.val()[element], key: element });
        });
        items.sort((a, b) => (b.timeUpdate >= a.timeUpdate ? 1 : -1));
        items = items.filter(v => v.type.indexOf("ข่าวการรับสมัคร") > -1);
      }

      this.setState({ newsItems: items });
    });
  }

  render() {
    return (
      <>
        <HtmlHead prefixTitle="ข่าวการรับสมัคร" path="news/join" />
        <DefaultLayout>
          <div className="mb-3">
            <h5>
              <b>ข่าวการรับสมัคร</b>
            </h5>
          </div>
          <div className="row">
            {this.state.newsItems.map((value, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <div
                    className="box-padding newsBox"
                    onClick={() => {
                      window.open(
                        `${this.props.basePath}news/?news=${value.key}`
                      );
                    }}
                  >
                    <div className="row">
                      <div
                        className="col-md-6 mb-3"
                        style={{ height: "200px", overflow: "hidden" }}
                      >
                        <div className="mb-3">
                          <img
                            src={value.imgPath}
                            alt="newsImg"
                            style={{
                              objectFit: "scale-down",
                              maxHeight: "100px",
                              height: "100%",
                              width: "100%"
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">{value.name}</div>
                        <div>
                          <p>
                            {new Date(value.timeUpdate).getDate()}/
                            {new Date(value.timeUpdate).getMonth() + 1}/
                            {new Date(value.timeUpdate).getFullYear() + 543}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DefaultLayout>
      </>
    );
  }
}
