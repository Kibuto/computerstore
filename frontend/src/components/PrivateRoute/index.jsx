import React from "react";
import { useAuth } from "../../hooks";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, goto, ...rest }) => {
  const { token } = useAuth();
  console.log(token);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to={goto} />
      }
    />
  );
};

export default PrivateRoute;
