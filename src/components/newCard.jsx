import React from "react";
import { Form } from "../common/forms";
import Joi from "joi-browser";
import cardServices from "../common/services/cardsServices";

/***
 * "newCard" component
 */
class NewCard extends Form {
  /***
   * the state of the component
   */
  state = {
    formData: {
      bizName: "",
      bizCategory: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: [],
      bizImageDefault: [],
      bizImageWeek: [],
    },
    errors: {},
  };

  /**
   * the schema is a object that is parameters getting validate function
   */
  schema = {
    bizName: Joi.string().required(),
    bizCategory: Joi.string().required(),
    bizDescription: Joi.string().required(),
    bizAddress: Joi.string().required(),
    bizPhone: Joi.string().required(),
    bizImage: Joi.array(),
    bizImageDefault: Joi.array(),
    bizImageWeek: Joi.array(),
  };

  /**
   * the function that "handelSubmit" run if no errors 
   * the function will run the "newCard" function from the "cardServices" end catch the errors
   */
  doSubmit = async () => {
    const { formData } = this.state;
    const data1 = {
      ...formData,
      bizImageDefault: [
        'upload\\2021-03-03T07-01-43.744Z-business-card-1019952_1920 (1).jpg',
      ],
    };
    try {
      const data2 = await cardServices.newCard(data1);
      window.location = `/card/${data2._id}/edit-img`;
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
        <div
          className="row pb-5 rounded text-dark cardBackground"
        >
          <form onSubmit={this.handelSubmit} className="col-12 mt-5 ">
            <div className="row justify-content-md-center">
              <div className="col-12 col-md-6 col-lg-4">
                {this.renderInput("bizName", "שם העסק")}
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                {this.renderSelect(
                  "bizCategory",
                  "קטגורית העסק",
                  this.props.categories
                )}
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                {this.renderInput("bizAddress", "כתובת העסק")}
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                {this.renderInput("bizPhone", "מס' טלפון של העסק", "tel")}
              </div>
              <div className="col-12 ">
                {this.renderTextTara("bizDescription", 3, "תיאור העסק")}
              </div>
              <div className="col-12 col-md-6 col-lg-4 mt-3 ">
                {this.renderButton("צור כרטיס חדש ")}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewCard;
