import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useProvideCart = () => {
  const [cartStorage, setCartStorage] = useLocalStorage("cartStorage", {});
  const [cart, setCart] = useState({ cartItems: [], sum: 0, count: 0 });
  console.log("cart ", cart);

  useEffect(() => {
    _handleGetStorage();
  }, []);

  const countIncrease = (computer) => {
    setCart({
      cartItems: cart.cartItems
        .map(
          (item) =>
            item.name.toLowerCase() === computer.name.toLowerCase() && {
              ...item,
              quantity: item.quantity + 1,
            }
        )
        .filter(Boolean),
      sum: (cart.sum += parseFloat(computer.price)),
      count: cart.count + 1,
    });
    _handleSaveStorage(cart);
  };

  // removeFromCart(book){
  //   if(book.quantity >= 2) {
  //       this.setState({
  //           cartItems: this.state.cartItems.map(item => {
  //               if (item.name.toLowerCase() === book.name.toLowerCase()) {
  //                   item.quantity = item.quantity - 1;
  //               }
  //               return item;
  //           }),
  //           sum: this.state.sum -= parseFloat(book.price),
  //           count: this.state.count - 1
  //       });
  //   } else {
  //       const filter = this.state.cartItems.filter( item =>  item.name !== book.name )
  //       this.setState({
  //           cartItems: filter,
  //           count: this.state.count - 1,
  //           sum: this.state.sum -= parseFloat(book.price)
  //       })
  //   }
  // }

  const addToCart = (computer) => {
    let filter = cart.cartItems
      .map(
        (item) =>
          item.name.toLowerCase() === computer.name.toLowerCase() && item
      )
      .filter(Boolean);
    if (!filter.length) {
      const computerWithQuantity = { ...computer, quantity: 1 };
      setCart({
        cartItems: [...cart.cartItems, computerWithQuantity],
        count: cart.count + 1,
        sum: (cart.sum += parseFloat(computer.price)),
      });
      _handleSaveStorage(cart);
    } else {
      countIncrease(computer);
    }
  };

  const _handleGetStorage = async () => {
    const cartStorage = await localStorage.getItem("cartStorage");
    const parseStorage = JSON.parse(cartStorage);
    if (parseStorage) {
      setCart({ ...JSON.parse(cartStorage) });
    }
  };

  const _handleSaveStorage = async () => {
    setCartStorage(cart);
  };

  return { addToCart, countIncrease, cart };
};
