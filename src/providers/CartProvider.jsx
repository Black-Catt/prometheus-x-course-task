import { createContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [bookData, setBookData] = useState([]);

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

  const clearCart = () => {
    setCartItems([]);
    setBookData([]);
    localStorage.clear();
  };

  const value = {
    cartItems,
    addToCart,
    clearCart,
    bookData,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
