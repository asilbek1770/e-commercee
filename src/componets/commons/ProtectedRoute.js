import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../../services/authService";

export const ProtectedRoute = ({ component: Component, ...args }) => {
  return (
    <Route
      {...args}
      render={(props) => {
        if (!auth.getJwt())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location.pathname },
              }}
            />
          );
        return <Component {...props} />;
      }}
    />
  );
};
