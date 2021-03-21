import Joi from "joi-browser";
import React from "react";
import { Form } from "../common/forms";

/***
 * this component is in bielding
 */
class NewMessage extends Form {
  /***
   * the state of the component
   */
  state = {
    formData: {
      messageStar: 0,
      messageDescription: "",
    },
    errors: {},
  };

  /**
   * the schema is a object that is parameters getting validate function
   */
  schema = {
    messageStar: Joi.number(),
    messageDescription: Joi.string(),
  };

  render() {
    return null;
  }
}

export default NewMessage;
