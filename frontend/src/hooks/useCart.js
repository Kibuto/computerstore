// libs
import React, { useContext } from "react";
// hooks
import { useProvideCart } from "./useProvideCart";
// contexts
import { CartContext } from "../contexts";

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideCart({ children }) {
  const auth = useProvideCart();
  return <CartContext.Provider value={auth}>{children}</CartContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useCart = () => useContext(CartContext);
