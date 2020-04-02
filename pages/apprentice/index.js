import React, { Component } from "react";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";

export default class apprentice extends Component {
  render() {
    return (
      <>
        <HtmlHead prefixTitle="สหกิจศึกษาและฝึกงาน" path="apprentice" />
        <DefaultLayout>
          <div className="mb-3">
            <h5>
              <b>สหกิจศึกษาและฝึกงาน</b>
            </h5>
          </div>
          <div style={{ marginLeft: "50px" }} className="mb-3">
            <div className="mb-1">
              <h5>
                <b>สหกิจศึกษา</b>
              </h5>
            </div>
            <div style={{ marginLeft: "50px" }}>
              <div>
                <a href="http://www.coop.rmuti.ac.th/" target="_blank">
                  สหกิจศึกษา มทร.อีสาน
                </a>
              </div>
              <div>
                <a
                  href="http://www.coop.rmuti.ac.th/phocadownload/other/calendar2563.pdf"
                  target="_blank"
                >
                  ปฏิทินสหกิจ
                </a>
              </div>
              <div>
                <a href="#">
                  รายชื่อสถานประกอบการที่นักศึกษาเคยออกสหกิจของสาขา
                  อดีตถึงปัจจุบัน พร้อมรายชื่อ น.ศ. ที่ออกฝึก
                </a>
              </div>
              <div>
                <a
                  href="http://www.coop.rmuti.ac.th/phocadownload/other/coop_manual58.pdf"
                  target="_blank"
                >
                  คู่มือสหกิจศึกษา
                </a>
              </div>
              <div>
                <a
                  href="http://www.coop.rmuti.ac.th/index.php/2015-05-28-09-59-40/category/4-rmuti-coop"
                  target="_blank"
                >
                  แบบฟอร์สหกิจศึกษา
                </a>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "50px" }} className="mb-3">
            <div className="mb-1">
              <h5>
                <b>ฝึกงาน</b>
              </h5>
            </div>
            <div style={{ marginLeft: "50px" }}>
              <div>
                <a href="#">ปฏิทินฝึกงาน</a>
              </div>
              <div>
                <a href="#">
                  รายชื่อสถานประกอบการที่นักศึกษาเคยออกฝึกงานของสาขา
                  อดีตถึงปัจจุบัน พร้อมรายชื่อ น.ศ. ที่ออกฝึก
                </a>
              </div>
              <div>
                <a href="#">แบบฟอร์ม คำร้อง เกี่ยวกับการฝึกงาน</a>
              </div>
            </div>
          </div>
        </DefaultLayout>
      </>
    );
  }
}
