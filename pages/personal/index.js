import React, { Component } from "react";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";
import "./personal.scss";

export default class Personal extends Component {
  loadData = () => {
    this.props.db("/personal").on("value", async value => {
      let items = [];

      if (value.val()) {
        Object.keys(value.val()).forEach(key => {
          items.push({ key: key, ...value.val()[key] });
        });
        items.sort((a, b) => (a.index >= b.index ? 1 : -1));
        await this.props.delay(100);

        this.setState({ personal: items });
      } else {
        this.setState({ personal: items });
      }
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      personal: [],
      personalSelect: null
    };
  }

  async componentDidMount() {
    await this.props.delay(300);
    this.loadData();
  }

  render() {
    console.log(this.state.personal);
    return (
      <>
        <HtmlHead prefixTitle="คณาจารย์และเจ้าหน้าที่" path="personal" />
        <DefaultLayout>
          <div className="mb-3">
            <h5>
              <b>คณาจารย์และเจ้าหน้าที่</b>
            </h5>
          </div>
          <div className="row justify-content-center">
            {this.state.personal
              .filter(v => v.position.indexOf("หัวหน้าสาขา") > -1)
              .map((value, index) => {
                return (
                  <div className="col-md-4 mb-3" key={index}>
                    <div className="text-center">
                      <div
                        className="personalBox"
                        onClick={() => {
                          this.setState({ personalSelect: value });
                          window.$("#personalModal").modal("show");
                        }}
                      >
                        <div className="mb-3" style={{ height: "170px" }}>
                          <img
                            src={
                              value.imgPath ||
                              `${this.props.basePath}assets/img/person.svg`
                            }
                            alt="personalImg"
                            style={{
                              objectFit: "scale-down",
                              maxHeight: "170px",
                              height: "100%",
                              width: "100%"
                            }}
                          />
                        </div>

                        <div>
                          {value.prefix_th}&nbsp;{value.name_th}
                        </div>
                        <div>หัวหน้าสาขาวิชาคณิตศาสตร์และสถิติประยุกต์</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div style={{ marginTop: "30px", marginBottom: "30px" }}></div>
          <div className="row justify-content-center">
            {this.state.personal
              .filter(v => v.position.indexOf("อาจารย์ประจำ") > -1)
              .map((value, index) => {
                return (
                  <div className="col-md-4 mb-3" key={index}>
                    <div
                      className="personalBox"
                      onClick={() => {
                        this.setState({ personalSelect: value });
                        window.$("#personalModal").modal("show");
                      }}
                    >
                      <div className="text-center">
                        <div className="mb-3" style={{ height: "170px" }}>
                          <img
                            src={
                              value.imgPath ||
                              `${this.props.basePath}assets/img/person.svg`
                            }
                            alt="personalImg"
                            style={{
                              objectFit: "scale-down",
                              maxHeight: "170px",
                              height: "100%",
                              width: "100%"
                            }}
                          />
                        </div>

                        <div>
                          {value.prefix_th}&nbsp;{value.name_th}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div style={{ marginTop: "30px", marginBottom: "30px" }}></div>
          <div className="row justify-content-center">
            {this.state.personal
              .filter(v => v.position.indexOf("ธุรการ") > -1)
              .map((value, index) => {
                return (
                  <div className="col-md-4 mb-3" key={index}>
                    <div
                      className="personalBox"
                      onClick={() => {
                        this.setState({ personalSelect: value });
                        window.$("#personalModal").modal("show");
                      }}
                    >
                      <div className="text-center">
                        <div className="mb-3" style={{ height: "170px" }}>
                          <img
                            src={
                              value.imgPath ||
                              `${this.props.basePath}assets/img/person.svg`
                            }
                            alt="personalImg"
                            style={{
                              objectFit: "scale-down",
                              maxHeight: "170px",
                              height: "100%",
                              width: "100%"
                            }}
                          />
                        </div>

                        <div>
                          {value.prefix_th}&nbsp;{value.name_th}
                        </div>
                        <div>เจ้าหน้าที่บริหารงานทั่วไป</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </DefaultLayout>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="personalModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="personalModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="personalModalLabel">
                  ข้อมูล
                  {this.state.personalSelect
                    ? this.state.personalSelect.position
                    : ""}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {(() => {
                  if (this.state.personalSelect) {
                    return (
                      <>
                        <div className="row">
                          <div className="col-md-5 text-center">
                            <div className="mb-3">
                              <img
                                src={
                                  this.state.personalSelect.imgPath ||
                                  `${this.props.basePath}assets/img/person.svg`
                                }
                                alt="personalImg"
                                width="150px"
                              />
                            </div>
                          </div>
                          <div className="col-md-7">
                            <p>
                              {this.state.personalSelect.prefix_th}&nbsp;
                              {this.state.personalSelect.name_th}
                            </p>
                            <p>
                              {this.state.personalSelect.prefix_en}&nbsp;
                              {this.state.personalSelect.name_en}
                            </p>

                            <div className="mt-3">
                              <b>ข้อมูลติดต่อ</b>
                            </div>
                            <div>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "80px"
                                }}
                              >
                                ห้องพัก&nbsp;:
                              </span>
                              {this.state.personalSelect.room}
                            </div>
                            <div>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "80px"
                                }}
                              >
                                โทรศัพท์&nbsp;:
                              </span>
                              {this.state.personalSelect.telephone}
                            </div>
                            <div>
                              <span
                                style={{
                                  display: "inline-block",
                                  width: "80px"
                                }}
                              >
                                อีเมล&nbsp;:
                              </span>
                              {this.state.personalSelect.email}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="mt-3">
                            <b>ข้อมูลการศึกษา</b>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-sm table-borderless table-hover">
                              <tbody>
                                {this.state.personalSelect.level.map(
                                  (value, index) => {
                                    if (
                                      this.state.personalSelect.level[index] !=
                                      "-"
                                    )
                                      return (
                                        <tr key={index}>
                                          <td style={{ minWidth: "150px" }}>
                                            {
                                              this.state.personalSelect.level[
                                                index
                                              ]
                                            }
                                          </td>
                                          <td style={{ minWidth: "200px" }}>
                                            สาขาวิชา
                                            {
                                              this.state.personalSelect.branch[
                                                index
                                              ]
                                            }
                                          </td>
                                          <td style={{ minWidth: "250px" }}>
                                            สถาบัน&nbsp;
                                            {
                                              this.state.personalSelect
                                                .schoolName[index]
                                            }
                                          </td>
                                          <td style={{ minWidth: "150px" }}>
                                            ปีที่สำเร็จ&nbsp;
                                            {
                                              this.state.personalSelect.year[
                                                index
                                              ]
                                            }
                                          </td>
                                        </tr>
                                      );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    );
                  }
                })()}
              </div>
              {/* <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}
