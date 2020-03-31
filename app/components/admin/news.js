import React, { Component } from "react";
import Compressor from "compressorjs";

let editor;

export default class News extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const self = this;
    this.props.db("/news").on("value", value => {
      console.log(value.val());
    });

    await this.props.delay(200)
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
                  that.image.insert(event.status, null, null, that.image.get());
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
  }

  componentWillUnmount() {
    editor.destroy();
  }

  render() {
    return (
      <div>
        <textarea id="example" defaultValue={""}></textarea>
      </div>
    );
  }
}
