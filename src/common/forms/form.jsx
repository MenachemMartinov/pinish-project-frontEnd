/**
 * all import for the file
 */
import Joi from "joi-browser";
import React, { Component } from "react";
import Input from "./input";
import TextTara from "./textTara";
import Select from "./select";
import cardServices from "../services/cardsServices";
import { toast } from "react-toastify";
import { NewImgUpload } from "../services/filesServies";

class Form extends Component {
  /**
   * the function what run on submit the parameter is event
   * the function check if exist a error
   * if a error is exist the "setState.errors" cangue with the new error
   * if not exist a error the "doSubmit" function run
   */
  handelSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (!errors) {
      this.doSubmit();
    }
  };

  /**
   * the function check if exist a error in one field
   * if a error is exist the "setState.errors" cangue with the new error
   * if error not exist will return null
   */
  validateProperty(name, value) {
    const schema = { [name]: this.schema[name] };
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  /**
   * the function check if exist a error in all fields
   */
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

  /**
   * the function is following on cangues on the form fields
   */
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

  
  /**
   * the function is following on cangues on the form files field
   */
  handelChangeFile = async ({ target: { files, name } }) => {
    console.log(files);
    if (!files.length) {
      console.log("1");
      toast("לא בחרת קובץ ");
      return;
    }
    const { formData } = this.state;
    console.log("2");

    const sendFile = new FormData();
    sendFile.append("file", files[0], files[0].name);
    try {
      const value = await NewImgUpload(sendFile);
      console.log(value);
      // validate form
      const updateFormData = { ...formData };
      updateFormData[name].push(value?.data?.path);
      // update state
      this.setState({ formData: updateFormData });
      if (value?.data?.path) {
        this.setState({ rode: true });
        toast.success("התמונה עלתה");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        console.log(err);
      }
    }
  };

  /** 
   * the function render the input component
   * the function getting 3 parameters
   * 1 the name of the field
   * 2 the label for the field
   * 3 the type of the field the basic type is "text"
   * 
   */
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
        {...rest}
      />
    );
  };

  /** 
   * the function render the input component
   * the function getting 3 parameters
   * 1 the name of the field
   * 2 the label for the field
   * 3 the type of the field the basic type is "file"
   * the deferent between the "renderInput" is the function that run onChange
   */
  renderInputFile = (name, label, type = "file", ...rest) => {
    const { errors } = this.state;
    return (
      <Input
        type={type}
        onChange={this.handelChangeFile}
        error={errors && errors[name]}
        name={name}
        label={label}
        {...rest}
      />
    );
  };

  /** 
   * the function render the select component
   * the function getting 3 parameters 
   * 1 the name of the field
   * 2 the label for the field
   * 3 the option for the select field (array)
   */
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

  /**
   * the function render the textTara component
   * the function getting 3 parameters 
   * 1 the name of the field
   * 2 the rows of the field
   * 3 the placeholder for the field
   */
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

  /**
   * the function render the forms button 
   * the function getting 1 parameter
   * 1 the label of the button
   */
  renderButton(label = "") {
    return (
      <button disabled={this.validate()} className="btn btn-block btn-primary">
        {label}
      </button>
    );
  }

  
  /**
   * the function render the forms button in a form of send files
   * the function getting 1 parameter
   * 1 the label of the button
   */
  renderButtonImg(label = "") {
    return (
      <button disabled={!this.state.rode} className="btn btn-block btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
