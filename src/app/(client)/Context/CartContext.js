"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../../../store/store";

const CartContext = createContext();


export const CartProvider = ({ children }) => {

  const {sale}= useSnapshot(state)
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity, size) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item._id === product._id && item.size === size
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity, size }];
    });
  };

  const removeFromCart = (id, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item._id === id && item.size === size))
    );
  };

const emptyCart = () =>{
  setCart([])
}
  const updateQuantity = (id, size, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // const subtotal = cart.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );

  const subtotal = cart.reduce(
    (acc, item) => {
      if (item?.onSale && sale?.percentageOff) {
        const discountedPrice = item.price * ((100 - sale.percentageOff) / 100);
        return acc + discountedPrice * item.quantity;
      } else {
        return acc + item.price * item.quantity;
      }
    },
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        totalItems,
        emptyCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
