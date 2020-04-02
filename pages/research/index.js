import React, { Component } from "react";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";

export default class research extends Component {
  constructor(props) {
    super(props);
    this.state = {
      research: [
        {
          name: "Narongsak Yotha",
          path: "https://scholar.google.com/citations?user=__Qd430AAAAJ&hl=en"
        },
        {
          name: "Tammarat Kleebmek",
          path: "https://scholar.google.com/citations?hl=en&user=zOH79twAAAAJ"
        },
        {
          name: "Chanitnan Jaipranop",
          path: "https://scholar.google.com/citations?hl=en&user=IAp_yEUAAAAJ"
        },
        {
          name: "Phannipa Worapun",
          path: "https://scholar.google.com/citations?hl=en&user=V7v6kMUAAAAJ"
        },
        {
          name: "Peerapongpat Singkibud",
          path: "https://scholar.google.com/citations?hl=en&user=GR0ZBm4AAAAJ"
        },
        {
          name: "Siriluk Wangrat",
          path: "https://scholar.google.com/citations?hl=en&user=yuf0ZZcAAAAJ"
        },
        {
          name: "Anucha Klamnoi",
          path: "https://scholar.google.com/citations?hl=en&user=kp-ZWYwAAAAJ"
        },
        {
          name: "Narongsuk Boonsri",
          path: "https://scholar.google.com/citations?hl=en&user=E9cyBqwAAAAJ"
        },
        {
          name: "Mongkol Leelaphaiboon",
          path: "https://scholar.google.com/citations?hl=en&user=cptvXLUAAAAJ"
        },
        {
          name: "Piyanuch Pongkan",
          path: "https://scholar.google.com/citations?hl=en&user=u-rb654AAAAJ"
        }
      ]
    };
  }
  render() {
    return (
      <div>
        <HtmlHead prefixTitle="งานวิจัย" path="research" />
        <DefaultLayout>
          <div className="mb-3">
            <h5>
              <b>งานวิจัย</b>
            </h5>
          </div>

          <div className="mb-3 text-center">
            <img
              src={`${this.props.basePath}assets/img/research.jpg`}
              width="450px"
            />
          </div>

          <div style={{ marginLeft: "50px" }}>
            <div className="table-responsive">
              <table className="table table-sm tabel-hover table-borderless">
                <thead>
                  <tr>
                    <th style={{ maxWidth: "20px", textAlign: "center" }}>
                      ลำดับ
                    </th>
                    <th>ชื่อ</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.research.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ maxWidth: "20px", textAlign: "center" }}>
                          {index + 1}
                        </td>
                        <td>
                          <a href={value.path} target="_blank">
                            {value.name}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </DefaultLayout>
      </div>
    );
  }
}
