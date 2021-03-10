import Joi from "joi-browser";
import React from "react";
import { Form } from "../common/forms";

class NewMessage extends Form {
  state = {
    formData: {
      messageStar: 0,
      messageDescription: "",
    },
    errors: {},
  };

  schema = {
    messageStar: Joi.number(),
    messageDescription: Joi.string(),
  };

  render() {
    return null;
  }
}

export default NewMessage;
