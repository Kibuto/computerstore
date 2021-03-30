import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

const Header = () => (
  <div className="container">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to={"/"} className="navbar-brand">
        Computer Store
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
              Products
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Header;
