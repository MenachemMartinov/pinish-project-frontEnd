import React from "react";
import { Form } from "../../common/forms";
import Joi from "joi-browser";
import { apiUrl } from "../../common/config.json";
import { toast } from "react-toastify";
import http from "../../common/services/httpService";
import userService from "../../common/services/userService";
import "../form.css";


class SignUpBusiness extends Form {
  state = {
    formData: {
      password: "",
      email: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  async doSubmit() {
    const body = { ...this.state.formData, business: true };

    try {
      await userService.signUp(body);
      toast.success("המשתמש נוצר");
      this.props.history.replace("/login");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errors: { email: "error email is exit" } });
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 text-center">
            <h2>הרשמה לבעלי עסקים </h2>
          </div>
          <div className="col-lg-6">
            <form onSubmit={this.handelSubmit} noValidate>
              {this.renderInput("name", "Name")}
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Sign Up !!!")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpBusiness;
