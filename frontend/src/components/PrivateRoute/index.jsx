import React from "react";
import { useAuth } from "../../hooks";
import { Redirect, Route } from "react-router-dom";

// const PrivateRoute = ({ component: Component, roles, ...rest }) => {
//   const { user } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         const currentUser = user || false;
//         if (!currentUser.role) {
//           // not logged in so redirect to login page with the return url
//           return (
//             <Redirect
//               to={{ pathname: "/login", state: { from: props.location } }}
//             />
//           );
//         }

//         // check if route is restricted by role
//         if (roles && roles.indexOf(currentUser.role) === -1) {
//           return <Redirect to={{ pathname: "/" }} />;
//         }

//         // authorised so return component
//         return <Component {...props} />;
//       }}
//     />
//   );
// };

// export default PrivateRoute;

const PrivateRoute = ({ component: Component, roles, goto, ...rest }) => {
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
