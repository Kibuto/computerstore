import React from "react";
import { useAuth } from "../../hooks";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, roles = [], goto, ...rest }) => {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) {
          return <Redirect to="/login" />;
        }

        if (roles && !roles.includes(token.role)) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
