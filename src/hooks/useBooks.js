import { useContext } from 'react';
import { BooksContext } from '../providers/BooksProvider';

export default function useBooks() {
  return useContext(BooksContext);
}
