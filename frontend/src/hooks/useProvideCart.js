import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useProvideCart = () => {
  // eslint-disable-next-line no-unused-vars
  const [cartStorage, setCartStorage] = useLocalStorage("cartStorage", {});
  const [cart, setCart] = useState({ cartItems: [], sum: 0, count: 0 });

  useEffect(() => {
    _handleGetStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartStorage]);

  const countIncrease = (computer) => {
    const addItem = {
      cartItems: cart.cartItems.map((item) => {
        if (item.name.toLowerCase() === computer.name.toLowerCase()) {
          item.quantity = item.quantity + 1;
        }
        return item;
      }),
      sum: (cart.sum += parseFloat(computer.price)),
      count: cart.count + 1,
    };
    setCart(addItem);
    setCartStorage(addItem);
  };

  const removeFromCart = (computer) => {
    if (computer.quantity >= 2) {
      const minusItem = {
        cartItems: cart.cartItems.map((item) => {
          if (item.name.toLowerCase() === computer.name.toLowerCase()) {
            item.quantity = item.quantity - 1;
          }
          return item;
        }),
        sum: (cart.sum -= parseFloat(computer.price)),
        count: cart.count - 1,
      };
      setCart(minusItem);
      setCartStorage(minusItem);
    } else {
      const filter = cart.cartItems.filter(
        (item) => item.name !== computer.name
      );
      const minusItem = {
        cartItems: filter,
        count: cart.count - 1,
        sum: (cart.sum -= parseFloat(computer.price)),
      };
      setCart(minusItem);
      setCartStorage(minusItem);
    }
  };

  const addToCart = (computer) => {
    let filter = cart.cartItems
      .map(
        (item) =>
          item.name.toLowerCase() === computer.name.toLowerCase() && item
      )
      .filter(Boolean);
    if (!filter.length) {
      const computerWithQuantity = { ...computer, quantity: 1 };
      const addItem = {
        cartItems: [...cart.cartItems, computerWithQuantity],
        count: cart.count + 1,
        sum: (cart.sum += parseFloat(computer.price)),
      };
      setCart(addItem);
      setCartStorage(addItem);
    } else {
      countIncrease(computer);
    }
  };

  const _handleGetStorage = async () => {
    const cartStorage = await localStorage.getItem("cartStorage");
    const parseStorage = JSON.parse(cartStorage);
    if (parseStorage) {
      setCart({ ...JSON.parse(cartStorage) });
    } else {
      setCartStorage(cart);
    }
  };

  return {
    addToCart,
    countIncrease,
    cart,
    removeFromCart,
    setCartStorage,
    setCart,
  };
};
