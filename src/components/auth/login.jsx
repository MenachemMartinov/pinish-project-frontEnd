import React from "react";
import Joi from "joi-browser";
import { Form } from "../../common/forms";
import UserService from "../../common/services/userService";
import "../form.css";

class LogIn extends Form {
  state = {
    formData: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.formData;

    try {
      await UserService.login(email, password);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errors: { email: err.response.data } });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 text-center">
            <h3>התחברות לאתר </h3>
          </div>
          <div className="col-lg-6 ">
            <form onSubmit={this.handelSubmit} noValidate>
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Sign In !!!")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
