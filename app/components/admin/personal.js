import React, { Component } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import Card from "./card/Card";
import update from "immutability-helper";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Compressor from "compressorjs";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "pointer"
};

const Container = ({ items, setItems }) => {
  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = items[dragIndex];
    setItems(
      "items",
      update(items, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      })
    );
  };

  return (
    <table className="table table-borderless table-hover table-sm">
      <thead>
        <tr>
          <th style={{ textAlign: "center" }} scope="col">
            ลำดับ
          </th>
          <th scope="col">ชื่อ</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i}>
            <td style={{ textAlign: "center" }}>{i + 1}</td>
            <td style={{ cursor: "pointer" }}>
              <Card
                index={i}
                id={item.key}
                text={item.fname}
                moveCard={moveCard}
                setItems={setItems}
              />
            </td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const FormPersonal = ({ personalSelect, setItems, basePath }) => {
  let oldPersonal = { ...personalSelect };
  const { control, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  const onUpload = data => {
    if (data) {
      new Compressor(data, {
        quality: 1,
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onloadend = base64 => {
            oldPersonal = { ...personalSelect };
            oldPersonal["imgPath"] = base64.target.result;
            setItems("personalSelect", oldPersonal);
          };
        },
        error(err) {
          console.log(err.message);
        }
      });
    }
  };

  return (
    <div className="modal-content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-header">
          <h5 className="modal-title" id="personalModalLabel">
            ข้อมูลบุคลากร
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
          <div className="row">
            <div className="col-md-5 mb-3">
              <div className="text-center">
                <div className="mb-3">
                  <img
                    src={
                      personalSelect.imgPath ||
                      `${basePath}assets/img/person.svg`
                    }
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
                  onChange={e => {
                    onUpload(e.target.files[0]);
                    e.target.value = "";
                    e.preventDefault();
                  }}
                />
              </div>
            </div>
            <div className="col-md-7 mb-3">
              <Controller
                as={
                  <TextField
                    label="คำนำหน้า (ไทย)"
                    type="text"
                    style={{ width: "100%" }}
                    required={true}
                  />
                }
                name="prefix_th"
                control={control}
                defaultValue={personalSelect.prefix_th}
                className="mb-3"
              />

              <Controller
                as={
                  <TextField
                    label="คำนำหน้า (อังกฤษ)"
                    type="text"
                    style={{ width: "100%" }}
                    required={true}
                  />
                }
                name="prefix_en"
                control={control}
                defaultValue={personalSelect.prefix_en}
                className="mb-3"
              />

              <Controller
                as={
                  <TextField
                    label="ชื่อ-สกุล (ไทย)"
                    type="text"
                    style={{ width: "100%" }}
                    required={true}
                  />
                }
                name="name_th"
                control={control}
                defaultValue={personalSelect.name_th}
                className="mb-3"
              />

              <Controller
                as={
                  <TextField
                    label="ชื่อ-สกุล (อังกฤษ)"
                    type="text"
                    style={{ width: "100%" }}
                    required={true}
                  />
                }
                name="name_en"
                control={control}
                defaultValue={personalSelect.name_en}
                className="mb-3"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="mb-3">
                <b>ข้อมูลติดต่อ</b>
              </div>
              <Controller
                as={
                  <TextField
                    label="ห้องพัก"
                    type="text"
                    style={{ width: "100%" }}
                    required={true}
                  />
                }
                name="room"
                control={control}
                defaultValue={personalSelect.room}
                className="mb-3"
              />

              <Controller
                as={
                  <TextField
                    label="หมายเลขโทรศัพท์"
                    type="text"
                    style={{ width: "100%" }}
                    required={true}
                  />
                }
                name="telephone"
                control={control}
                defaultValue={personalSelect.telephone}
                className="mb-3"
              />

              <Controller
                as={
                  <TextField
                    label="อีเมล"
                    type="text"
                    style={{ width: "100%" }}
                    required={true}
                  />
                }
                name="email"
                control={control}
                defaultValue={personalSelect.email}
                className="mb-3"
              />
            </div>
            <div className="col-md-8 mb-3">
              <div className="mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <b>ข้อมูลการศึกษา</b>
                  </div>
                  <div className="col-md-6">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        oldPersonal.level.push("");
                        oldPersonal.branch.push("");
                        oldPersonal.schoolName.push("");
                        oldPersonal.year.push("");

                        setItems("personalSelect", oldPersonal);
                      }}
                    >
                      เพิ่มข้อมูล
                    </button>
                  </div>
                </div>
              </div>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ระดับ</th>
                    <th scope="col">สาขา</th>
                    <th scope="col">สถาบัน</th>
                    <th scope="col">ปีที่สำเร็จ</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {personalSelect.level.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Controller
                            as={<input type="text" required={true} />}
                            name={`${"level[" + index + "]"}`}
                            control={control}
                            defaultValue={personalSelect.level[index]}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <Controller
                            as={<input type="text" required={true} />}
                            name={`${"branch[" + index + "]"}`}
                            control={control}
                            defaultValue={personalSelect.branch[index]}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <Controller
                            as={<input type="text" required={true} />}
                            name={`${"schoolName[" + index + "]"}`}
                            control={control}
                            defaultValue={personalSelect.schoolName[index]}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <Controller
                            as={<input type="text" required={true} />}
                            name={`${"year[" + index + "]"}`}
                            control={control}
                            defaultValue={personalSelect.year[index]}
                            className="form-control"
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              oldPersonal.year.splice(1, 1);
                              oldPersonal.schoolName.splice(1, 1);
                              oldPersonal.branch.splice(1, 1);
                              oldPersonal.level.splice(1, 1);

                              // delete oldPersonal.year[index];
                              // delete oldPersonal.schoolName[index];
                              // delete oldPersonal.branch[index];
                              // delete oldPersonal.level[index];


                              setItems("personalSelect", oldPersonal);
                            }}
                          >
                            ลบข้อมูล
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
    </div>
  );
};

const initialPersonal = {
  imgPath: "",
  prefix_th: "",
  prefix_en: "",
  name_th: "",
  name_en: "",
  room: "",
  telephone: "",
  email: "",
  level: [""],
  branch: [""],
  schoolName: [""],
  year: [""]
};

export default class Personal extends Component {
  loadData = () => {
    this.props.db("/personal").once("value", async value => {
      let items = [];

      if (value.val()) {
        Object.keys(value.val()).forEach(key => {
          items.push({ key: key, ...value.val()[key] });
        });
        items.sort((a, b) => (a.index >= b.index ? 1 : -1));
        await this.props.delay(100);

        this.state.setItems("items", items);
      }
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isDragging: false,
      personalSelect: { ...initialPersonal },
      personalModal: false,
      setItems: (key, data) => {
        this.setState({ [`${key}`]: data });
      }
    };
  }

  componentDidMount() {
    this.loadData();

    window.$("#personalModal").on("hidden.bs.modal", e => {
      this.state.setItems("personalModal", false);
    });

    window.$("#personalModal").on("show.bs.modal", e => {
      this.state.setItems("personalModal", true);
    });
  }

  async componentDidUpdate() {
    let objectPersonal = {};
    if (this.state.items.length > 0) {
      this.state.items.forEach((val, i) => {
        objectPersonal[val.key] = { ...val };
        objectPersonal[val.key]["index"] = i;
        delete objectPersonal[val.key]["key"];
      });
      await this.props.delay(100);
      await this.props.db("/personal").set(objectPersonal);
    }
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-6 mb-3">
            <h5>
              <b>รายชื่อทั้งหมด</b>
            </h5>
          </div>
          <div className="col-md-6 text-right mb-3">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              data-toggle="modal"
              data-target="#personalModal"
              onClick={() => {
                this.state.setItems("personalSelect", initialPersonal);
              }}
            >
              เพิ่มรายชื่อ
            </button>
          </div>
        </div>
        <DndProvider backend={Backend}>
          <Container {...this.state} />
        </DndProvider>

        <div
          className="modal fade"
          id="personalModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="personalModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl" role="document">
            {(() => {
              if (this.state.personalModal)
                return (
                  <FormPersonal
                    personalSelect={this.state.personalSelect}
                    setItems={this.state.setItems}
                    basePath={this.props.basePath}
                  />
                );
              return "";
            })()}
          </div>
        </div>
      </>
    );
  }
}