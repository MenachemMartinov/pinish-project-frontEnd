import React from "react";
import Joi from "joi-browser";
import { Form } from "../common/forms";
import categoryService from "../common/services/categoryService";
import "./category.css";

/***
 * "newCategory" component
 */
class NewCategory extends Form {
  /***
   * the state of the component
   */
  state = {
    formData: {
      categoryName: "",
      image: "",
    },
    errors: {},
  };

  /**
   * the schema is a object that is parameters getting validate function
   */
  schema = {
    categoryName: Joi.string(),
    image: Joi.string(),
  };

  /**
   * the function that "handelSubmit" run if no errors
   * the function will run the "newCard" function from the "cardServices" end catch the errors
   */
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

  /**
   * the render jsx of the component
   */
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
