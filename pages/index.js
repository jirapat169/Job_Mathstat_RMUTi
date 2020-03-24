import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../app/redux";
import Link from "next/link";
import { HtmlHead } from "../app/components/html-head";
import DefaultLayout from "../app/components/default-layout";

import "./app.scss";

const basePath = require("./../base_path");

const TabsList = ({ tabChange, value }) => {
  const list = [
    {
      title: "ข่าวทั้งหมด",
      img: `${basePath()}assets/img/folder.svg`
    },
    {
      title: "ข่าวประชาสัมพันธ์",
      img: `${basePath()}assets/img/sound.svg`
    },
    {
      title: "ข่าวกิจกรรม",
      img: `${basePath()}assets/img/plays.svg`
    },
    {
      title: "ข่าวบริการวิชาการ",
      img: `${basePath()}assets/img/road.svg`
    },
    {
      title: "ข่าวการรับสมัคร",
      img: `${basePath()}assets/img/news.svg`
    }
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
    <div className="tabView" id={`tabView${value}`}>
      {children}
    </div>
  );
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
    };
  }

  componentDidMount() {
    this.tabChange(0);
  }

  tabChange = data => {
    window.$(".tabView").hide();
    window.$(`#tabView${data}`).show();
    this.setState({
      tabIndex: data
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
            <p>asdsa1</p>
          </TabsContent>
          <TabsContent value={1}>
            <p>asdsa2</p>
          </TabsContent>
          <TabsContent value={2}>
            <p>asdsa3</p>
          </TabsContent>
          <TabsContent value={3}>
            <p>asds4</p>
          </TabsContent>
          <TabsContent value={4}>
            <p>asdsa5</p>
          </TabsContent>
        </DefaultLayout>
      </>
    );
  }
}

export default connect(mapStateToProps)(Index);
