import React from "react";
import { Button } from "react-bootstrap";
import { useCart, useRouter } from "../../hooks";

const Cart = () => {
  const { cart } = useCart();
  const router = useRouter();

  return (
    <div className="cart-wrapper">
      {cart.count ? (
        cart.cartItems.map((item, index) => <div key={index}>{item.name}</div>)
      ) : (
        <div>Cart empty</div>
      )}
      <Button variant="primary" onClick={() => router.push("/confirm")}>
        Check out
      </Button>
    </div>
  );
};

export default Cart;
