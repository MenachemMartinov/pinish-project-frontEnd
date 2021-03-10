import React from "react";
import { Form } from "../common/forms";
import Joi from "joi-browser";
import cardServices from "../common/services/cardsServices";
import { Link } from "react-router-dom";

class EditCard extends Form {
  state = {
    formData: {
      bizName: "",
      bizCategory: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: [],
      bizImageDefault: "",
      bizImageWeek: "",
    },
    errors: {},
  };

  schema = {
    bizName: Joi.string().required(),
    bizCategory: Joi.string().required(),
    bizDescription: Joi.string().required(),
    bizAddress: Joi.string().required(),
    bizPhone: Joi.string().required(),
    bizImage: Joi.array(),
    bizImageDefault: Joi.string(),
    bizImageWeek: Joi.string(),
  };

  doSubmit = async () => {
    const { formData } = this.state;
    console.log(formData);
    try {
      await cardServices.newCard(formData);
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
        <div className="row ">
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
          <div className="col-12">
            <Link className="btn btn-primary btn-md mt-4" to={`/card/${this.props.match.params.id}/edit-img`}>
              העלאת תמונות חדשות
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCard;
