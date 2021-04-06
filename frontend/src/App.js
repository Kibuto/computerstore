// libs
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// hooks
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideCart } from "./hooks/useCart";
// components
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
// routers
import { mainRoutes, adminRoutes } from "./routers";
// others
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const routeComponents = mainRoutes.map((route) => (
    <Route
      key={route.path || "/not-found"}
      path={route.path}
      exact={route.exact || false}
      component={route.component}
    />
  ));

  const adminRouteComponents = adminRoutes.map((route) => (
    <Route
      key={route.path || "/not-found"}
      path={route.path}
      exact={route.exact || false}
      component={route.component}
    />
  ));

  return (
    <ProvideAuth>
      <Router>
        <ProvideCart>
          <PrivateRoute
            roles={["user", "admin"]}
            component={() => (
              <div>
                <Header />
                <Suspense fallback={<div>...Loading</div>}>
                  <Switch>{routeComponents}</Switch>
                </Suspense>
              </div>
            )}
          />
          <PrivateRoute
            roles={["admin"]}
            component={() => (
              <Suspense fallback={<div>...Loading</div>}>
                <Switch>{adminRouteComponents}</Switch>
              </Suspense>
            )}
          />
        </ProvideCart>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
      </Router>
    </ProvideAuth>
  );
};

export default App;
