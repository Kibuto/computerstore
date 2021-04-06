import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import { adminRoutes } from "../../routers";

const Header = () => {
  const [category, setCategory] = useState([]);
  const { cart } = useCart();
  const { signout, user, token } = useAuth();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/categoryList`)
      .then((res) => {
        if (res.data.success) {
          setCategory(res.data.categories);
        }
      });
  }, []);

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Computer Store</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link>
          <Link to="/products">Products</Link>
        </Nav.Link>

        {token.role === "admin" &&
          adminRoutes.map((route, index) => (
            <Nav.Link key={index}>
              <Link to={route.path}>{route.pageName.replace("nt", "nt ")}</Link>
            </Nav.Link>
          ))}
        {category && (
          <NavDropdown title="Category">
            {category.map((item, index) => (
              <NavDropdown.Item key={index}>
                <Link to={`/category/${item.id}`}>{item.name}</Link>
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        )}
      </Nav>
      <Nav>
        <Nav.Link>
          <Link to="/cart">{cart.count}</Link>
        </Nav.Link>
        <NavDropdown title={user.name ? user.name : "Hi There"}>
          <NavDropdown.Item>
            <Link to="/profile">Profile</Link>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <Link to="/order-history">Order History</Link>
          </NavDropdown.Item>
          <NavDropdown.Item onClick={signout}>Log out</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default Header;
