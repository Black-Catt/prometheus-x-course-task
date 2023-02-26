import { createContext, useState } from 'react';
import data from '../data/books.json';

import imageNotFound from '../img/specific-book/imageNotFound.png';

export const BooksContext = createContext(null);

export const BooksProvider = ({ children }) => {
  const { books: bookData } = data;
  const [books, setBooks] = useState(bookData);
  const value = {
    books,
    imageNotFound,
  };

  return (
    <BooksContext.Provider value={value}>{children}</BooksContext.Provider>
  );
};
