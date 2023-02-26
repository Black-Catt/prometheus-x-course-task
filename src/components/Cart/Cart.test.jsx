import { render } from '@testing-library/react';
import Cart from './Cart';
import { CartProvider } from '../../providers/CartProvider';
import { BooksProvider } from '../../providers/BooksProvider';
import { AuthProvider } from '../../providers/AuthProvider';
import { MemoryRouter } from 'react-router-dom';

describe('Cart component', () => {
  test('Renders the Cart component correctly', () => {
    const mockItems = [
      { title: 'Testing 123', image: 'image.jpg', price: 10 },
      { title: 'Test Again', image: 'image2.png', price: 15 },
    ];

    const { container } = render(
      <AuthProvider>
        <MemoryRouter>
          <BooksProvider>
            <CartProvider>
              <Cart cartItems={mockItems} />
            </CartProvider>
          </BooksProvider>
        </MemoryRouter>
      </AuthProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
