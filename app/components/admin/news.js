import React, { Component } from "react";
import Compressor from "compressorjs";
import { useForm, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
let editor;

const FormNews = ({ newsUpdate, db, newsSelect }) => {
  const { control, register, handleSubmit } = useForm();
  const onSubmit = async data => {
    if (newsUpdate) {
      // Update
      await db(`/news/${newsSelect["key"]}`).set(data);
      window.$("#newsModal").modal("hide");
    } else {
      // Insert
      data["timeUpdate"] = new Date().getTime();
      await db("/news").push(data);
      window.$("#newsModal").modal("hide");
    }

    alert("บันทึกข้อมูลสำเร็จ");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-header">
        <h5 className="modal-title" id="newsModalLabel">
          จัดการข่าวสาร
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
        <Controller
          as={<TextField label="ชื่อข่าว" required={true} />}
          name="name"
          control={control}
          style={{ width: "100%" }}
          defaultValue={newsSelect.name}
          className="mb-3"
        />

        <Controller
          as={
            <FormControl>
              <InputLabel id="select-label">ประเภทข่าวสาร</InputLabel>
              <Select
                labelId="select-label"
                id="select-menu"
                native
                defaultValue={newsSelect.type}
                required={true}
              >
                <option aria-label="None" value="" />
                <option value={"ข่าวประชาสัมพันธ์"}>ข่าวประชาสัมพันธ์</option>
                <option value={"ข่าวกิจกรรม"}>ข่าวกิจกรรม</option>
                <option value={"ข่าวบริการวิชาการ"}>ข่าวบริการวิชาการ</option>
                <option value={"ข่าวการรับสมัคร"}>ข่าวการรับสมัคร</option>
              </Select>
            </FormControl>
          }
          name="type"
          control={control}
          style={{ width: "100%" }}
          className="mb-3"
          defaultValue={newsSelect.type}
        />

        <textarea
          id="example"
          required
          name="newsData"
          ref={register}
          defaultValue={newsSelect.newsData}
        />
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

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsModal: false,
      newsUpdate: false,
      newsItems: [],
      newsSelect: null,
      newsType: ""
    };
  }

  async componentDidMount() {
    const self = this;
    this.props.db("/news").on("value", value => {
      let items = [];

      if (value.val()) {
        Object.keys(value.val()).forEach((element, index) => {
          items.push({ ...value.val()[element], key: element });
        });
        items.sort((a, b) => (b.timeUpdate >= a.timeUpdate ? 1 : -1));
      }

      this.setState({ newsItems: items });
    });

    window.$("#newsModal").on("hidden.bs.modal", e => {
      this.setState({ newsModal: false });
      editor.destroy();
    });

    window.$("#newsModal").on("show.bs.modal", async e => {
      this.setState({ newsModal: true });

      await this.props.delay(100);
      editor = new window.FroalaEditor("#example", {
        placeholderText: "เนื้อหาข่าว",
        charCounterCount: false,
        events: {
          "image.beforeUpload": function(images) {
            let that = this;
            new Compressor(images[0], {
              quality: 0.8,
              success(result) {
                self.props.storageUpload(result, event => {
                  console.log(event);
                  if (event.upload == true) {
                    that.image.insert(
                      event.status,
                      null,
                      null,
                      that.image.get()
                    );
                  }
                });
              },
              error(err) {
                alert("ไม่รองรับไฟล์นี้");
                console.log(err.message);
              }
            });

            that.popups.hideAll();
            return false;
          },
          "image.beforeRemove": async function(images) {
            var del = await self.props.storageRemove(images[0].src);
            console.log(del);
          },
          "video.beforeUpload": function(video) {
            alert("ไม่รองรับการอัพโหลดวิดีโอ");
            return false;
          },
          "file.beforeUpload": function(files) {
            let that = this;
            let fileData = files[0];
            self.props.storageUpload(fileData, event => {
              console.log(event);
              if (event.upload == true) {
                that.file.insert(event.status, fileData.name);
              }
            });
            that.popups.hideAll();
            return false;
          },
          "file.unlink": async function(link) {
            var del = await self.props.storageRemove(link.href);
            console.log(del);
          }
        }
      });
    });
  }

  componentWillUnmount() {
    this.props.db("/news").off("value", value => {});
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-6">
            <h5>
              <b>ข่าวสารทั้งหมด</b>
            </h5>
          </div>
          <div className="col-md-6 text-right">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                this.setState({
                  newsSelect: { type: "", newsData: "", name: "" },
                  newsUpdate: false
                });
                window.$("#newsModal").modal("show");
              }}
            >
              เพิ่มข่าวสาร
            </button>
          </div>
        </div>

        <div className="mt-3">
          <div className="row">
            <div className="col-md-6">
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="select">ประเภทข่าวสาร</InputLabel>
                <Select
                  labelId="select"
                  id="select-menu1"
                  native
                  value={
                    this.state.newsType == "" ? "ทั้งหมด" : this.state.newsType
                  }
                  onChange={e => {
                    this.setState({
                      newsType:
                        e.target.value == "ทั้งหมด" ? "" : e.target.value
                    });
                  }}
                >
                  <option value={"ทั้งหมด"}>ทั้งหมด</option>
                  <option value={"ข่าวประชาสัมพันธ์"}>ข่าวประชาสัมพันธ์</option>
                  <option value={"ข่าวกิจกรรม"}>ข่าวกิจกรรม</option>
                  <option value={"ข่าวบริการวิชาการ"}>ข่าวบริการวิชาการ</option>
                  <option value={"ข่าวการรับสมัคร"}>ข่าวการรับสมัคร</option>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
        <div className="mt-3">
          <table className="table table-striped table-hover table-borderless table-sm">
            <thead>
              <tr>
                <th></th>
                <th>ชื่อข่าว</th>
                <th>ประเภทข่าว</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.newsItems
                .filter(v => v.type.indexOf(this.state.newsType) > -1)
                .map((value, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ verticalAlign: "middle" }}>{index + 1}</td>
                      <td style={{ verticalAlign: "middle" }}>{value.name}</td>
                      <td style={{ verticalAlign: "middle" }}>{value.type}</td>
                      <td style={{ verticalAlign: "middle" }}>
                        <span className="mr-3 ml-3">
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={() => {
                              console.log(value);
                            }}
                          >
                            ดูตัวอย่าง
                          </button>
                        </span>

                        <span className="mr-3 ml-3">
                          <button
                            type="button"
                            className="btn btn-warning btn-sm"
                            onClick={() => {
                              this.setState({
                                newsSelect: value,
                                newsUpdate: true
                              });
                              window.$("#newsModal").modal("show");
                            }}
                          >
                            แก้ไข
                          </button>
                        </span>

                        <span className="mr-3 ml-3">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={async () => {
                              if (confirm("ยืนยันการลบข้อมูล")) {
                                await this.props
                                  .db(`/news/${value.key}`)
                                  .remove();
                              }
                            }}
                          >
                            ลบ
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="newsModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="newsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              {(() => {
                if (this.state.newsModal)
                  return <FormNews {...this.state} {...this.props} />;

                return "";
              })()}
            </div>
          </div>
        </div>
      </>
    );
  }
}
