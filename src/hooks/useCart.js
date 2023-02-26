import { useContext } from 'react';
import { CartContext } from '../providers/CartProvider';

export default function useCart() {
  return useContext(CartContext);
}
