// libs
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// hooks
import { ProvideAuth } from "./hooks/useAuth";
// components
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PrivateRoute from "./components/PrivateRoute";
// routers
import mainRoutes from "./routers";
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

  return (
    <ProvideAuth>
      <Router>
        <PrivateRoute
          goto="/login"
          component={() => (
            <div>
              <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <Link to="/" className="navbar-brand">
                    Computer Store
                  </Link>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <Link to="/" className="nav-link">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/products" className="nav-link">
                          Products
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <Suspense fallback={<div>...Loading</div>}>
                <Switch>{routeComponents}</Switch>
              </Suspense>
            </div>
          )}
        />
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
