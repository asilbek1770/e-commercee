import React, { Component } from "react";
import Joi from "joi-browser";
import { Input } from "./Input";
import { Select } from "./Select";

export default class Form extends Component {
  validation = () => {
    let { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    error.details.forEach((err) => {
      console.log(err);
      errors[err.path[0]] = err.message;
    });
    return errors;
  };

  validProparty = ({ name, value }) => {
    let obj = { [name]: value };
    let schema = { [name]: this.schema[name] };
    let { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handlerChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMassage = this.validProparty(input);
    if (errorMassage) errors[input.name] = errorMassage;
    else delete errors[input.name];

    let data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handlerSubmit = (e) => {
    e.preventDefault();
    let errors = this.validation();
    this.setState({ errors: errors ?? {} });
    if (errors) return;
    this.doSumbit();
  };

  renderButton = (label) => {
    return (
      <button type="submit" className="btn btn-primary">
        {label}
      </button>
    );
  };

  rendringInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handlerChange}
        type={type}
        error={errors[name]}
      />
    );
  };

  rendringSelect = (name, label) => {
    const { data, errors, genres } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handlerChange}
        error={errors[name]}
        options={genres}
      />
    );
  };
}
