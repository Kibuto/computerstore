// libs
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// hooks
import { ProvideAuth } from "./hooks/useAuth";
import { ProvideCart } from "./hooks/useCart";
// components
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
// routers
import { mainRoutes, adminRoutes, userRoutes } from "./routers";
// others
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const userComponents = userRoutes.map((route) => (
    <Route
      key={route.path || "/not-found"}
      path={route.path}
      exact={route.exact || false}
      component={route.component}
    />
  ));

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
          <Suspense fallback={<div>...Loading</div>}>
            <Header />
            <Switch>{routeComponents}</Switch>
            <PrivateRoute
              roles={["user", "admin"]}
              component={() => <Switch>{userComponents}</Switch>}
            />
            <PrivateRoute
              roles={["admin"]}
              component={() => <Switch>{adminRouteComponents}</Switch>}
            />
            <Footer />
          </Suspense>
        </ProvideCart>
      </Router>
    </ProvideAuth>
  );
};

export default App;
