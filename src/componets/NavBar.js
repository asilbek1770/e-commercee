import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <ul className="navbar-nav d-flex">
          <li className="nav-item d-inline">
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
          </li>
          <li className="nav-item d-inline">
            <NavLink className="nav-link" to="/costumers">
              Costumers
            </NavLink>
          </li>
          <li className="nav-item d-inline">
            <NavLink className="nav-link" to="/rentals">
              Rentals
            </NavLink>
          </li>
          {!user && (
            <>
              <li className="nav-item d-inline">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item d-inline">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="nav-item d-inline">
                <NavLink className="nav-link" to="/profile">
                  {user.name}
                </NavLink>
              </li>
              <li className="nav-item d-inline">
                <NavLink className="nav-link" to="/logout">
                  logout
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
  }
}
