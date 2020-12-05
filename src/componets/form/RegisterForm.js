import React from "react";
import Joi from "joi-browser";
import Form from "../commons/Form";
import { register } from "../../services/usersService";
import auth from "../../services/authService";
export default class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSumbit = async () => {
    try {
      const { headers } = await register(this.state.data);
      auth.loginWithToken(headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container p-4">
        <h1>Register</h1>
        <form onSubmit={this.handlerSubmit}>
          {this.rendringInput("username", "Username")}
          {this.rendringInput("password", "Password", "password")}
          {this.rendringInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}
