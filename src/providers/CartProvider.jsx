import { createContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book, quantity, total) => {
    book = Object.assign({}, book);
    const existingBook = cartItems.find((item) => item.title === book.title);

    let newCartItems;
    if (existingBook) {
      newCartItems = cartItems.map((item) => {
        if (item.title === book.title) {
          item.count = quantity;
          item.price = total;
        }
        return item;
      });
    } else {
      book.count = quantity;
      book.price = total;
      newCartItems = [...cartItems, book];
    }
    localStorage.setItem('bookQuantity', newCartItems.length);
    localStorage.setItem('books', JSON.stringify(newCartItems));
    setCartItems(newCartItems);
  };

  const deleteCartItem = (bookTitle) => {
    const newCartItems = cartItems.filter((book) => book.title !== bookTitle);

    if (newCartItems.length === 0) {
      localStorage.clear();
    }

    localStorage.setItem('books', JSON.stringify(newCartItems));
    setCartItems(newCartItems);
  };
  const clearCart = () => {
    setCartItems([]);
    localStorage.clear();
  };
  const value = {
    cartItems,
    addToCart,
    clearCart,
    deleteCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
