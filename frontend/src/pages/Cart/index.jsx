import React from "react";
import { Button, Table } from "react-bootstrap";
import { useAuth, useCart, useRouter } from "../../hooks";
import { formatNumber } from "../../utils";
import "./style.css";

const Cart = () => {
  const router = useRouter();
  const { token } = useAuth();
  const { cart, countIncrease, removeFromCart } = useCart();

  return (
    <div className="cart-wrapper container mt-4">
      {cart.count ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={`${process.env.REACT_APP_URL_IMAGE}${item.image}`}
                    alt={item.image}
                    width={100}
                    height={100}
                  />
                </td>
                <td>
                  <Button varian="primary" onClick={() => removeFromCart(item)}>
                    -
                  </Button>
                  {item.quantity}
                  <Button varian="primary" onClick={() => countIncrease(item)}>
                    +
                  </Button>
                </td>
                <td>{formatNumber(item.price * item.quantity)}</td>
                <td></td>
              </tr>
            ))}
            <tr>
              <td colSpan="5">Total: {formatNumber(cart.sum)}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (!token) {
                      alert("You have to login to checkout!!!");
                      router.push("/login");
                    } else {
                      router.push("/confirm");
                    }
                  }}
                >
                  Check out
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <div>Cart empty</div>
      )}
    </div>
  );
};

export default Cart;
