import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { useForm, Controller } from "react-hook-form";
import { HtmlHead } from "../html-head";
import AppService from "../../services/app-service";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const From = ({ basePath, onLoginSubmit, showPass, setState }) => {
  const { control, handleSubmit } = useForm();

  return (
    <div className="mt-3">
      <h5>
        <b>เข้าสู่ระบบ</b>
      </h5>
      <form onSubmit={handleSubmit(onLoginSubmit)}>
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="mb-3 text-center">
              <img
                src={`${basePath}assets/img/administrator.svg`}
                style={{ maxWidth: "150px", width: "100%" }}
              />
            </div>
            <div className="mb-2">
              <Controller
                as={
                  <TextField
                    label="Username"
                    type="text"
                    style={{ width: "100%" }}
                    required={true}
                  />
                }
                name="username"
                control={control}
                defaultValue=""
              />
            </div>
            <div className="mb-2">
              <Controller
                as={
                  <TextField
                    label="Password"
                    type={`${showPass ? "text" : "password"}`}
                    style={{ width: "100%" }}
                    required={true}
                  />
                }
                name="password"
                control={control}
                defaultValue=""
              />
            </div>
            <div className="">
              <FormControlLabel
                control={<Checkbox checked={showPass} name="showPassword" />}
                onChange={(event) => {
                  setState(event.target.checked);
                }}
                label="แสดงรหัสผ่าน"
              />
            </div>
            <div className="text-center mt-3">
              <button type="submit" className="btn btn-warning">
                เข้าสู่ระบบ
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: false,
      setState: (data) => {
        return this.setState({ showPass: data });
      },
    };
  }

  componentDidMount() {}

  onLoginSubmit = (data) => {
    // console.log(data);

    if (data.username == "admin" && data.password == "mathstat@2020") {
      AppService.localStorage().set("userlogin", data);
      window.location.reload();
    } else if (
      data.username == "tammarat.kl" &&
      data.password == "Aa44551877"
    ) {
      AppService.localStorage().set("userlogin", data);
      window.location.reload();
    } else {
      alert("ข้อมูลผู้ใช้งานไม่ถูกต้อง");
      AppService.localStorage().clear();
    }
  };

  render() {
    return (
      <>
        <HtmlHead
          prefixTitle="เข้าสู่ระบบ"
          path={`${this.props.basePath}admin`}
        ></HtmlHead>
        <From
          {...this.props}
          onLoginSubmit={this.onLoginSubmit}
          {...this.state}
        />
      </>
    );
  }
}

export default Login;
