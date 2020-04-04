import React, { Component } from "react";
import { useForm, Controller } from "react-hook-form";
import Compressor from "compressorjs";
import Button from "@material-ui/core/Button";
import Card from "./card/Card";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import update from "immutability-helper";

const CarouselForm = ({
  setState,
  carouselSelect,
  db,
  basePath,
  carouselUpdate,
  carouselItems,
  loadData,
}) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (carouselUpdate) {
      //update
    } else {
      //insert
      await db(`/carousel`).push({
        index: carouselItems.length,
        ...carouselSelect,
      });
      window.$("#carouselModal").modal("hide");
      alert("บันทึกสำเร็จ");
    }
    loadData();
  };

  const onUpload = (data) => {
    if (data) {
      new Compressor(data, {
        quality: 1,
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onloadend = (base64) => {
            setState({ carouselSelect: { img: base64.target.result } });
          };
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-header">
        <h5 className="modal-title">Modal title</h5>
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
        <div className="mb-3">
          <div className="text-center">
            <div className="mb-3">
              <img
                src={carouselSelect.img || `${basePath}assets/img/person.svg`}
                alt="personalImg"
                width="170px"
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                window.$("#imgPathInput").click();
              }}
            >
              เลือกรูปภาพ
            </Button>
            <input
              name="imgPathInput"
              type="file"
              style={{ display: "none" }}
              id="imgPathInput"
              onChange={(e) => {
                onUpload(e.target.files[0]);
                e.target.value = "";
                e.preventDefault();
              }}
            />
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          ปิด
        </button>
        <button type="submit" className="btn btn-primary">
          บันทึก
        </button>
      </div>
    </form>
  );
};

export default class Carousel extends Component {
  loadData = async () => {
    this.props.db("/carousel").once("value", (value) => {
      let items = [];
      if (value.val()) {
        Object.keys(value.val()).forEach((el, i) => {
          items.push({ key: el, ...value.val()[el] });
        });
        items.sort((a, b) => (a.index >= b.index ? 1 : -1));
      }

      this.setState({ carouselItems: items });
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      carouselUpdate: false,
      carouselModal: false,
      carouselSelect: {},
      setState: (data) => {
        this.setState(data);
      },
      carouselItems: [],
      carouselItemsCopy: [],
    };
  }

  async componentDidMount() {
    await this.props.delay(300);
    this.loadData();

    window.$("#carouselModal").on("hidden.bs.modal", (e) => {
      this.setState({ carouselModal: false });
    });

    window.$("#carouselModal").on("show.bs.modal", (e) => {
      this.setState({ carouselModal: true });
    });

    window.$("#carouselModalIndex").on("hidden.bs.modal", (e) => {});

    window.$("#carouselModalIndex").on("show.bs.modal", (e) => {});
  }

  componentWillUnmount() {
    this.props.db("/carousel").off("value", (value) => {});
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-6">
            <h5>
              <b>รูปภาพทั้งหมด</b>
            </h5>
          </div>
          <div className="col-md-6 text-right">
            <span className="mr-3">
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={async () => {
                  this.setState({
                    carouselItemsCopy: this.state.carouselItems,
                  });
                  await this.props.delay(100);
                  window.$(`#carouselModalIndex`).modal("show");
                }}
              >
                เรียงลำดับรูปภาพ
              </button>
            </span>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                this.setState({
                  carouselUpdate: false,
                });
                window.$("#carouselModal").modal("show");
              }}
            >
              เพิ่มรูปภาพ
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div className="row">
            {this.state.carouselItems.map((el, i) => {
              return (
                <div key={el.key} className="col-md-4">
                  <div className="newsBox box-padding">
                    <div style={{ height: "230px" }} className="mb-3">
                      <img
                        src={el.img}
                        alt="newsImg"
                        style={{
                          objectFit: "scale-down",
                          maxHeight: "230px",
                          height: "100%",
                          width: "100%",
                        }}
                      />
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={async () => {
                          if (confirm("ยืนยันการลบรูปนี้")) {
                            await this.props.db(`/carousel/${el.key}`).remove();
                          }
                        }}
                      >
                        ลบรูปภาพ
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="carouselModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="carouselModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              {(() => {
                if (this.state.carouselModal)
                  return (
                    <CarouselForm
                      {...this.state}
                      {...this.props}
                      loadData={this.loadData}
                    />
                  );

                return "";
              })()}
            </div>
          </div>
        </div>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="carouselModalIndex"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="carouselModalLabelIndex"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">เรียงลำดับรูปภาพ</h5>
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
                <DndProvider backend={Backend}>
                  {this.state.carouselItemsCopy.map((el, i) => {
                    return (
                      <Card
                        key={i}
                        index={i}
                        id={el.key}
                        text={
                          <div className="text-center">
                            <img src={el.img} width="100px" />
                          </div>
                        }
                        moveCard={(dragIndex, hoverIndex) => {
                          const dragCard = this.state.carouselItemsCopy[
                            dragIndex
                          ];
                          this.setState({
                            carouselItemsCopy: update(
                              this.state.carouselItemsCopy,
                              {
                                $splice: [
                                  [dragIndex, 1],
                                  [hoverIndex, 0, dragCard],
                                ],
                              }
                            ),
                          });
                        }}
                      />
                    );
                  })}
                </DndProvider>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  ปิด
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    let backup = {};
                    let data = [...this.state.carouselItemsCopy];

                    this.state.carouselItemsCopy.forEach((el, i) => {
                      data[i]["index"] = i;
                      backup[data[i]["key"]] = { ...data[i] };
                      delete backup[data[i]["key"]]["key"];
                    });

                    await this.props.db("/carousel").set(backup);
                    await this.loadData();

                    window.$("#carouselModalIndex").modal("hide");
                    alert("บันทึกข้อมูลสำเร็จ...");
                  }}
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
