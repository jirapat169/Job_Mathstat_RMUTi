import React, { Component } from "react";
import { HtmlHead } from "../../app/components/html-head";
import DefaultLayout from "../../app/components/default-layout";

export default class contact extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <HtmlHead prefixTitle="ติดต่อเรา" path="contact" />
        <DefaultLayout>
          <h5 className="mb-3">
            <b>ติดต่อเรา</b>
          </h5>
          <div className="row justify-content-center mb-3">
            <div className="col-md-6">
              <p className="mb-3">
                สาขาคณิตศาสตร์และสถิติประยุกต์ คณะวิทยาศาสตร์และศิลปศาสตร์
                มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน 744 ถ.สุรนารายณ์ ต.ในเมือง
                อ.เมือง จ.นครราชสีมา 30000
              </p>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <div className="mb-3">
                    <a className="mb-1">
                      <img
                        src={`${this.props.basePath}assets/img/phone.svg`}
                        width="20px"
                        alt="423799.svg"
                      ></img>
                      &nbsp;&nbsp;044-233000 ต่อ 4335
                    </a>
                  </div>
                  <div className="mb-3">
                    <a
                      href="https://www.facebook.com/MathStatRmuti/"
                      target="_blank"
                    >
                      <img
                        src={`${this.props.basePath}assets/img/iFacebook.svg`}
                        width="20px"
                        alt="1312139.svg"
                      ></img>
                      &nbsp;&nbsp;Math-Stat RMUTI
                    </a>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <img
                    className="imgFacebook"
                    src={`${this.props.basePath}assets/img/facebook.png`}
                    width="100px"
                    alt="facebook"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mb-3" style={{ overflow: "auto" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1145.8407105541028!2d102.12150723707686!3d14.985299168523264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31194c7f1c4f1ce1%3A0x4469e73e68885998!2z4LiE4LiT4Liw4Lin4Li04LiX4Lii4Liy4Lio4Liy4Liq4LiV4Lij4LmM4LmB4Lil4Liw4Lio4Li04Lil4Lib4Lio4Liy4Liq4LiV4Lij4LmM!5e0!3m2!1sth!2sth!4v1585836706940!5m2!1sth!2sth"
              width="600"
              height="450"
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </DefaultLayout>
      </>
    );
  }
}
