import Joi from "joi-browser";
import React, { Component } from "react";
import Input from "./input";
import TextTara from "./textTara";
import Select from "./select";
import cardServices from "../services/cardsServices";
import { toast } from "react-toastify";

class Form extends Component {
  handelSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (!errors) {
      this.doSubmit();
    }
  };

  validateProperty(name, value) {
    const schema = { [name]: this.schema[name] };
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  validate = () => {
    const {
      state: { formData },
      schema,
    } = this;

    const { error } = Joi.validate(formData, schema, {
      abortEarly: false,
    });
    if (!error) {
      return null;
    }
    const errors = {};
    for (const { path, message } of error.details) {
      errors[path[0]] = message;
    }
    return errors;
  };

  handelChange = ({ target: { value, name } }) => {
    const { errors, formData } = this.state;

    // validate input
    const errorsCopy = { ...errors } || {};
    const errorsMessage = this.validateProperty(name, value);

    if (errorsMessage) {
      errorsCopy[name] = errorsMessage;
    } else {
      delete errorsCopy[name];
    }

    // validate form
    const updateFormData = { ...formData };
    updateFormData[name] = value;
    // update state
    this.setState({ formData: updateFormData, errors: errorsCopy });
  };

  handelChangeFile = async ({ target: { files, name } }) => {
    if (!files[0]) {
      toast("לא בחרת קובץ ");
      return;
    }
    const { formData } = this.state;

    const sendFile = new FormData();
    sendFile.append("file", files[0], files[0].name);
    try {
      const value = await cardServices.uploadCardImages(sendFile);
      // validate form
      const updateFormData = { ...formData };
      updateFormData[name].push(value?.path);
      // update state
      this.setState({ formData: updateFormData });
      if (value?.path) {
        this.setState({ rode: true });
        toast.success("התמונה עלתה");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log(err);
      }
    }
  };

  renderInput = (name, label, type = "text", ...rest) => {
    const { formData, errors } = this.state;
    return (
      <Input
        type={type}
        value={formData[name]}
        onChange={this.handelChange}
        error={errors && errors[name]}
        name={name}
        label={label}
        rest={rest}
      />
    );
  };

  renderInputFile = (name, label, type = "file", ...rest) => {
    const { errors } = this.state;
    return (
      <Input
        type={type}
        onChange={this.handelChangeFile}
        error={errors && errors[name]}
        name={name}
        label={label}
        rest={rest}
      />
    );
  };

  renderSelect = (name, label, option = []) => {
    const { formData, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        onChange={this.handelChange}
        value={formData[name]}
        error={errors[name]}
        option={option}
      ></Select>
    );
  };

  renderTextTara(name, rows, placeholder) {
    const { formData, errors } = this.state;
    return (
      <TextTara
        name={name}
        rows={rows}
        placeholder={placeholder}
        onChange={this.handelChange}
        value={formData[name]}
        error={errors[name]}
      />
    );
  }

  renderButton(label = "") {
    return (
      <button disabled={this.validate()} className="btn btn-block btn-primary">
        {label}
      </button>
    );
  }

  renderButtonImg(label = "") {
    return (
      <button disabled={!this.state.rode} className="btn btn-block btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
