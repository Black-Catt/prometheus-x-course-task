import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useBooks from '../../hooks/useBooks';
import SpecificBook from './SpecificBook';
import { AuthProvider } from '../../providers/AuthProvider';

jest.mock('../../hooks/useCart');
jest.mock('../../hooks/useBooks');

describe('SpecificBook', () => {
  const book = {
    id: 1,
    title: 'Book Title',
    author: 'Book Author',
    price: 9.99,
    tag: 'Book Tag',
    description: 'Book Description',
    image: 'Book Image',
  };
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    useCart.mockReturnValue({
      addToCart: mockAddToCart,
    });
    useBooks.mockReturnValue({
      books: [book],
      imageNotFound: 'Image Not Found',
    });
  });

  test('renders book information', () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={[`/specific-book/${book.id}`]}>
          <Routes>
            <Route path="/specific-book/:bookId" element={<SpecificBook />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );

    const title = screen.getByText(book.title);
    expect(title).toBeInTheDocument();

    const author = screen.getByText(book.author);
    expect(author).toBeInTheDocument();

    const tag = screen.getByText(book.tag);
    expect(tag).toBeInTheDocument();

    const description = screen.getByText(book.description);
    expect(description).toBeInTheDocument();

    const image = screen.getByAltText('Book');
    expect(image).toHaveAttribute('src', book.image);

    const countInput = screen.getByTestId('quantity-display');
    fireEvent.change(countInput, { target: { value: 2 } });

    const addToCartButton = screen.getByTestId('book-btn');
    fireEvent.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith(book, 2, '19.98');

    const total = screen.getByText('19.98');
    expect(total).toBeInTheDocument();

    const price = screen.getByText(`${book.price}`);
    expect(price).toBeInTheDocument();
  });
});
