import React from "react";
import Joi from "joi-browser";
import Form from "../commons/Form";
import auth from "../../services/authService";
export default class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSumbit = async () => {
    try {
      const { username, password } = this.state.data;
      await auth.login(username, password);
      const { state } = this.props.location;
      window.location = state ? state.from : "/";
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
        <h1>Login</h1>
        <form onSubmit={this.handlerSubmit}>
          {this.rendringInput("username", "Username")}
          {this.rendringInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}
