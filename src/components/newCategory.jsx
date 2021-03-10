import React from "react";
import Joi from "joi-browser";
import { Form } from "../common/forms";
import categoryService from "../common/services/categoryService";
import "./category.css";

class NewCategory extends Form {
  state = {
    formData: {
      categoryName: "",
      image: "",
    },
    errors: {},
  };

  schema = {
    categoryName: Joi.string(),
    image: Joi.string(),
  };

  doSubmit = async () => {
    const { formData } = this.state;
    try {
      await categoryService.newCategory(formData);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ formData: { email: err.response.data } });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row pb-5 rounded categoryBackground ">
          <form onSubmit={this.handelSubmit} className="col-12 mt-5 ">
            <div className="row justify-content-md-center">
              <div className="col-12 col-md-6 col-lg-4">
                {this.renderInput("categoryName", "categoryName")}
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                {this.renderInput("image", "image")}
              </div>

              <div className="col-12 col-md-12 col-lg-8 ">
                {this.renderButton("create new category")}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewCategory;
