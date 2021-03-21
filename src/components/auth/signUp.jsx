import React from "react";
import { Form } from "../../common/forms";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import userService from "../../common/services/userService";
import "../form.css";

/***
 * the subscribe component
 * the component will typeof class
 */
class SignUp extends Form {
  /**
   * the state of the component
   * the state is like local DB
   */
  state = {
    formData: {
      password: "",
      email: "",
      name: "",
    },
    errors: {},
  };

  /**
   * the schema is a object that is parameters getting validate function
   */
  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  /**
   * the function that "handelSubmit" run if no errors
   * the function will run the "signUp" function from the "userService" end catch the errors
   * end the reload the page to "/login"
   */
  async doSubmit() {
    const body = { ...this.state.formData, user: true };

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

  /**
   * the render jsx of the component
   */
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 text-center">
            <h2>הרשמה למשתמשים</h2>
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

export default SignUp;
