import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Button, Form } from "react-bootstrap";
import { useAuth, useCart, useRouter } from "../../hooks";
import "./style.css";

const Confirm = () => {
  const { cart, setCartStorage, setCart } = useCart();
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [shipDate, setShipDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("0");
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL_LARAVEL}/getUserById/${token.id}`)
      .then((res) => {
        const { name, address } = res.data.user;
        setName(name);
        setAddress(address);
      })
      .catch((err) => console.error(err));
  }, [token.id]);

  const checkOut = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL_LARAVEL}/checkout`, {
        cartItems: cart.cartItems,
        sum: cart.sum,
        userInfo: {
          id: token.id,
          name,
          address,
          shipDate: moment(shipDate, "YYYY-MM-DD").format(
            "YYYY-MM-DD HH:mm:ss"
          ),
        },
      })
      .then((res) => {
        if (res.data.success) {
          setCart({ cartItems: [], sum: 0, count: 0 });
          setCartStorage({ cartItems: [], sum: 0, count: 0 });
          router.push("/products");
        }
      });
  };

  return (
    <div className="container confirm-wrapper">
      <Form>
        <Form.Group controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupShipDate">
          <Form.Label>Ship date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter order date"
            value={shipDate}
            onChange={(e) => setShipDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPaymentMethod">
          <Form.Label>Payment method</Form.Label>
          <Form.Control
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            as="select"
          >
            <option value="0">Cash</option>
            <option value="1">PayPal</option>
          </Form.Control>
        </Form.Group>
      </Form>
      {paymentMethod === "0" ? (
        <Button variant="primary" onClick={checkOut}>
          Check out
        </Button>
      ) : (
        <Button variant="primary" onClick={checkOut}>
          Go to PayPal
        </Button>
      )}
    </div>
  );
};

export default Confirm;
