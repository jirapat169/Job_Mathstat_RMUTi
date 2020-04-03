import React, { Component } from "react";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";

export default class bachelor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <HtmlHead prefixTitle="หลักสูตรปริญญาตรี" path="bachelor" />
        <DefaultLayout>
          <div className="text-center mb-3">
            <h5 className="mb-2">
              <b>หลักสูตรวิทยาศาสตรบัณฑิต (สถิติประยุกต์)</b>
            </h5>
            <h5 className="mb-3">
              <b>Bachelor of Science Program in Applied Statistics</b>
            </h5>
            <div className="mb-3">
              <img
                src={`${this.props.basePath}assets/img/logo_mathstat.jpg`}
                width="150px"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <p className="mb-2">
              ระดับปริญญาตรี วิทยาศาสตรบัณฑิต สาขาคณิตศาสตร์และสถิติประยุกต์
              คณะวิทยาศาสตร์และศิลปศาสตร์
            </p>
            <p>หลักสูตรใหม่ 2559</p>
            <p>หลักสูตร 127 หน่วยกิต ระยะเวลาในการศึกษา 4 ปี</p>
            <p>หมวดวิชาศึกษาทั่วไป 30 หน่วยกิต</p>
            <p>หมวดวิชาชีพเฉพาะ 91 หน่วยกิต</p>
            <p>หมวดวิชาเลือกเสรี 6 หน่วยกิต</p>
          </div>
          <div style={{ marginLeft: "50px" }}>
            <div>
              -{" "}
              <a
                href={`${this.props.basePath}assets/luksut.pdf`}
                target="_blank"
              >
                หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาสถิติประยุกต์
              </a>
            </div>
            <div>
              -{" "}
              <a
                href={`${this.props.basePath}assets/apprentice2.pdf`}
                target="_blank"
              >
                แผนการเรียนฝึกงาน
              </a>
            </div>
            <div>
              -{" "}
              <a
                href={`${this.props.basePath}assets/apprentice4.pdf`}
                target="_blank"
              >
                แผนการเรียนสหกิจศึกษา
              </a>
            </div>
          </div>
        </DefaultLayout>
      </>
    );
  }
}
