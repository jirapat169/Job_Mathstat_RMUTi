import React, { Component } from "react";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";

export default class seminar extends Component {
  render() {
    return (
      <>
        <HtmlHead prefixTitle="สัมมนาและโครงงานพิเศษ" path="seminar" />
        <DefaultLayout>
          <div className="mb-3">
            <h5>
              <b>สัมมนาและโครงงานพิเศษ</b>
            </h5>
          </div>
          <div style={{ marginLeft: "50px" }} className="mb-3">
            <div className="mb-1">
              <h5>
                <b>สัมมนา</b>
              </h5>
            </div>
            <div style={{ marginLeft: "50px" }}>
              <div>
                <a href="#">ดาวโหลด รูปแบบรูปเล่มในการสัมมนา</a>
              </div>
              <div>
                <a href="#">
                  ฐานข้อมูลรายวิชาสัมมนา แยกแต่ละปี (เรื่องที่สัมมนา
                  กลุ่มที่จัดทำ อาจารย์ที่ปรึกษา)
                </a>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "50px" }} className="mb-3">
            <div className="mb-1">
              <h5>
                <b>โครงงานพิเศษ</b>
              </h5>
            </div>
            <div style={{ marginLeft: "50px" }}>
              <div>
                <a href="#">ดาวโหลด คู่มือการจัดทำรูปเล่มโครงงานพิเศษ</a>
              </div>
              <div>
                <a href="#">ดาวโหลด รูปแบบรูปเล่ม โครงงานพิเศษ</a>
              </div>
              <div>
                <a href="#">
                  ฐานข้อมูลโครงงานพิเศษ แยกแต่ละปี (เรื่องที่สัมมนา
                  กลุ่มที่จัดทำ อาจารย์ที่ปรึกษา)
                </a>
              </div>
            </div>
          </div>
        </DefaultLayout>
      </>
    );
  }
}
