import React, { Component } from "react";
import { HtmlHead } from "../app/components/html-head";
import DefaultLayout from "../app/components/default-layout";

import "./index.scss";

const basePath = require("./../base_path");

const TabsList = ({ tabChange, value }) => {
  const list = [
    {
      title: "ข่าวทั้งหมด",
      img: `${basePath()}assets/img/folder.svg`,
    },
    {
      title: "ข่าวประชาสัมพันธ์",
      img: `${basePath()}assets/img/sound.svg`,
    },
    {
      title: "ข่าวกิจกรรม",
      img: `${basePath()}assets/img/plays.svg`,
    },
    {
      title: "ข่าวบริการวิชาการ",
      img: `${basePath()}assets/img/road.svg`,
    },
    {
      title: "ข่าวการรับสมัคร",
      img: `${basePath()}assets/img/news.svg`,
    },
  ];
  return (
    <div style={{ overflowX: "auto" }} className="mb-1">
      <div className="tabsContent">
        {list.map((element, index) => (
          <div
            className={`tabList ${index == value ? "tabList-active" : ""}`}
            key={index}
            onClick={() => {
              tabChange(index);
            }}
          >
            <div className="tabContent">
              <div className="mb-1">
                <img src={element.img} width="30px" />
              </div>
              <div>{element.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TabsContent = ({ value, children }) => {
  return (
    <div className="tabView box-padding" id={`tabView${value}`}>
      {children}
    </div>
  );
};

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      newsItems: [],
    };
  }

  async componentDidMount() {
    this.tabChange(0);
    await this.props.delay(300);
    this.props.db("/news").on("value", (value) => {
      let items = [];

      if (value.val()) {
        Object.keys(value.val()).forEach((element, index) => {
          if (value.val()[element]["type"] != "บทความทั่วไป")
            items.push({ ...value.val()[element], key: element });
        });

        items.sort((a, b) => (b.timeUpdate >= a.timeUpdate ? 1 : -1));
      }

      this.setState({ newsItems: items });
    });
  }

  componentWillUnmount() {
    if (this.props.db) {
      this.props.db("/news").off("value", (value) => {});
    }
  }

  tabChange = (data) => {
    window.$(".tabView").hide();
    window.$(`#tabView${data}`).show();
    this.setState({
      tabIndex: data,
    });
  };

  render() {
    return (
      <>
        <HtmlHead />
        <DefaultLayout>
          <div className="mb-3">
            <img
              src={`${basePath()}assets/img/photo1.jpg`}
              width="100%"
              alt="photo1"
            />
          </div>
          <TabsList tabChange={this.tabChange} value={this.state.tabIndex} />
          <TabsContent value={0}>
            <div className="row">
              {this.state.newsItems.map((value, index) => {
                if (index < 6)
                  return (
                    <div className="col-md-4 mb-3" key={index}>
                      <div
                        className="box-padding newsBox"
                        style={{ height: "250px", overflow: "hidden" }}
                        onClick={() => {
                          window.open(
                            `${this.props.basePath}news/?news=${value.key}`
                          );
                        }}
                      >
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <div className="mb-3" style={{ height: "100px" }}>
                              <img
                                src={value.imgPath}
                                alt="newsImg"
                                style={{
                                  objectFit: "scale-down",
                                  maxHeight: "100px",
                                  height: "100%",
                                  width: "100%",
                                }}
                              />
                            </div>

                            <div className="mb-2 d-none d-md-none d-lg-block">
                              <a href="#">#{value.type}</a>
                            </div>
                            <div className="d-none d-md-none d-lg-block">
                              <p>
                                {new Date(value.timeUpdate).getDate()}/
                                {new Date(value.timeUpdate).getMonth() + 1}/
                                {new Date(value.timeUpdate).getFullYear() + 543}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="mb-3">{value.name}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
              })}
            </div>
          </TabsContent>
          <TabsContent value={1}>
            <div className="row">
              {this.state.newsItems
                .filter((v) => v.type.indexOf("ข่าวประชาสัมพันธ์") > -1)
                .map((value, index) => {
                  if (index < 6)
                    return (
                      <div className="col-md-4 mb-3" key={index}>
                        <div
                          className="box-padding newsBox"
                          style={{ height: "250px", overflow: "hidden" }}
                          onClick={() => {
                            window.open(
                              `${this.props.basePath}news/?news=${value.key}`
                            );
                          }}
                        >
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <div className="mb-3" style={{ height: "100px" }}>
                                <img
                                  src={value.imgPath}
                                  alt="newsImg"
                                  style={{
                                    objectFit: "scale-down",
                                    maxHeight: "100px",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                />
                              </div>

                              <div className="mb-2 d-none d-md-none d-lg-block">
                                <a href="#">#{value.type}</a>
                              </div>
                              <div className="d-none d-md-none d-lg-block">
                                <p>
                                  {new Date(value.timeUpdate).getDate()}/
                                  {new Date(value.timeUpdate).getMonth() + 1}/
                                  {new Date(value.timeUpdate).getFullYear() +
                                    543}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="mb-3">{value.name}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                })}
            </div>
            <div
              style={{ marginTop: "30px" }}
              className="text-center"
              onClick={() => {
                window.open(`${this.props.basePath}news/publish`);
              }}
            >
              <a href="#">รายการข่าวประชาสัมพันธ์ทั้งหมด</a>
            </div>
          </TabsContent>
          <TabsContent value={2}>
            <div className="row">
              {this.state.newsItems
                .filter((v) => v.type.indexOf("ข่าวกิจกรรม") > -1)
                .map((value, index) => {
                  if (index < 6)
                    return (
                      <div className="col-md-4 mb-3" key={index}>
                        <div
                          className="box-padding newsBox"
                          style={{ height: "250px", overflow: "hidden" }}
                          onClick={() => {
                            window.open(
                              `${this.props.basePath}news/?news=${value.key}`
                            );
                          }}
                        >
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <div className="mb-3" style={{ height: "100px" }}>
                                <img
                                  src={value.imgPath}
                                  alt="newsImg"
                                  style={{
                                    objectFit: "scale-down",
                                    maxHeight: "100px",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                />
                              </div>

                              <div className="mb-2 d-none d-md-none d-lg-block">
                                <a href="#">#{value.type}</a>
                              </div>
                              <div className="d-none d-md-none d-lg-block">
                                <p>
                                  {new Date(value.timeUpdate).getDate()}/
                                  {new Date(value.timeUpdate).getMonth() + 1}/
                                  {new Date(value.timeUpdate).getFullYear() +
                                    543}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="mb-3">{value.name}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                })}
            </div>
            <div
              style={{ marginTop: "30px" }}
              className="text-center"
              onClick={() => {
                window.open(`${this.props.basePath}news/activity`);
              }}
            >
              <a href="#">รายการข่าวกิจกรรมทั้งหมด</a>
            </div>
          </TabsContent>
          <TabsContent value={3}>
            <div className="row">
              {this.state.newsItems
                .filter((v) => v.type.indexOf("ข่าวบริการวิชาการ") > -1)
                .map((value, index) => {
                  if (index < 6)
                    return (
                      <div className="col-md-4 mb-3" key={index}>
                        <div
                          className="box-padding newsBox"
                          style={{ height: "250px", overflow: "hidden" }}
                          onClick={() => {
                            window.open(
                              `${this.props.basePath}news/?news=${value.key}`
                            );
                          }}
                        >
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <div className="mb-3" style={{ height: "100px" }}>
                                <img
                                  src={value.imgPath}
                                  alt="newsImg"
                                  style={{
                                    objectFit: "scale-down",
                                    maxHeight: "100px",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                />
                              </div>

                              <div className="mb-2 d-none d-md-none d-lg-block">
                                <a href="#">#{value.type}</a>
                              </div>
                              <div className="d-none d-md-none d-lg-block">
                                <p>
                                  {new Date(value.timeUpdate).getDate()}/
                                  {new Date(value.timeUpdate).getMonth() + 1}/
                                  {new Date(value.timeUpdate).getFullYear() +
                                    543}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="mb-3">{value.name}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                })}
            </div>
            <div
              style={{ marginTop: "30px" }}
              className="text-center"
              onClick={() => {
                window.open(`${this.props.basePath}news/academic`);
              }}
            >
              <a href="#">รายการข่าวบริการวิชาการทั้งหมด</a>
            </div>
          </TabsContent>
          <TabsContent value={4}>
            <div className="row">
              {this.state.newsItems
                .filter((v) => v.type.indexOf("ข่าวการรับสมัคร") > -1)
                .map((value, index) => {
                  if (index < 6)
                    return (
                      <div className="col-md-4 mb-3" key={index}>
                        <div
                          className="box-padding newsBox"
                          style={{ height: "250px", overflow: "hidden" }}
                          onClick={() => {
                            window.open(
                              `${this.props.basePath}news/?news=${value.key}`
                            );
                          }}
                        >
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <div className="mb-3" style={{ height: "100px" }}>
                                <img
                                  src={value.imgPath}
                                  alt="newsImg"
                                  style={{
                                    objectFit: "scale-down",
                                    maxHeight: "100px",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                />
                              </div>

                              <div className="mb-2 d-none d-md-none d-lg-block">
                                <a href="#">#{value.type}</a>
                              </div>
                              <div className="d-none d-md-none d-lg-block">
                                <p>
                                  {new Date(value.timeUpdate).getDate()}/
                                  {new Date(value.timeUpdate).getMonth() + 1}/
                                  {new Date(value.timeUpdate).getFullYear() +
                                    543}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="mb-3">{value.name}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                })}
            </div>
            <div
              style={{ marginTop: "30px" }}
              className="text-center"
              onClick={() => {
                window.open(`${this.props.basePath}news/join`);
              }}
            >
              <a href="#">รายการข่าวการรับสมัครทั้งหมด</a>
            </div>
          </TabsContent>
        </DefaultLayout>
      </>
    );
  }
}
