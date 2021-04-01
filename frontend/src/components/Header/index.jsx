import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Computer Store</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link>
        <Link to="/products">Products</Link>
      </Nav.Link>
    </Nav>
  </Navbar>
);

export default Header;
