import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import MoviesRouting from "./componets/MoviesRouting";
import NavBar from "./componets/NavBar";
import Costumers from "./componets/Costumers";
import Rentals from "./componets/Rentals";
import Movie from "./componets/Movie";
import LoginForm from "./componets/form/LoginForm";
import RegisterForm from "./componets/form/RegisterForm";
import LogOut from "./componets/LogOut";
import { ProtectedRoute } from "./componets/commons/ProtectedRoute";

export default class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const user = auth.getCurrentUser();
      this.setState({ user });
    } catch (err) {}
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <NavBar user={user} />
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={LogOut} />
          <ProtectedRoute path="/movies/:id" component={Movie} />
          <Route
            path="/movies"
            render={(props) => <MoviesRouting {...props} user={user} />}
          />
          <Route path="/costumers" component={Costumers} />
          <Route path="/rentals" component={Rentals} />
          <Redirect from="/" to="/movies" />
        </Switch>
      </>
    );
  }
}
