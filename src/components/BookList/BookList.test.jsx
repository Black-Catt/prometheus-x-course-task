import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookList from './BookList';
import '@testing-library/jest-dom/extend-expect';
import useBooks from '../../hooks/useBooks';
import { AuthProvider } from '../../providers/AuthProvider';

jest.mock('../../hooks/useBooks');

beforeEach(() => {
  useBooks.mockReturnValue({
    books: [
      {
        id: 1,
        title: 'Book A',
        author: 'Author A',
        price: 10,
        image: 'bookA.jpg',
      },
      {
        id: 2,
        title: 'Book B',
        author: 'Author B',
        price: 20,
        image: 'bookB.jpg',
      },
      {
        id: 3,
        title: 'Book C',
        author: 'Author C',
        price: 30,
        image: 'bookC.jpg',
      },
    ],
    imageNotFound: 'Image Not Found',
  });
});

describe('BookList', () => {
  it('renders without crashing', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('displays all books by default', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getAllByRole('article')).toHaveLength(3);
  });

  it('displays books in selected price range', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '15-30' },
    });

    expect(screen.getAllByRole('article')).toHaveLength(2);
  });

  it('displays searched books', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <BookList />
        </MemoryRouter>
      </AuthProvider>
    );

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'book a' },
    });

    expect(screen.getAllByRole('article')).toHaveLength(1);
  });
});
