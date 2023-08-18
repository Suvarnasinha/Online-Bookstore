
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartService from "../services/CartService";
import { AuthContext } from "./AuthContetxt";
import { useAuthContext } from "../layout/WithAuth"; // Assuming this is the correct path

const initialstate = {
  cartData: [],
  updateCart: () => {},
  emptyCart: () => {},
};

export const CartContext = createContext(initialstate);

export const Cartwrapper = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const authContext = useAuthContext();

  useEffect(() => {
    if (authContext.user.id) {
      updateCart();
    }
  }, [authContext]);

  const updateCart = () => {
    CartService.getList(authContext.user.id)
      .then((response) => setCartData(response.data.result))
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  };

  const emptyCart = () => {
    setCartData([]);
  };

  let value = { cartData, updateCart };
  return (
    <CartContext.Provider value={{ cartData, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
