import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useBooks from '../../hooks/useBooks';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const BookList = () => {
  const { books, imageNotFound } = useBooks();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(books);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortBooks = (book) => {
    return book.sort(
      (currentBook, nextBook) => currentBook.price - nextBook.price
    );
  };

  const handlePriceChange = (e) => {
    setSelectedPriceRange(e.target.value);
    let filteredBooks = [];
    switch (e.target.value) {
      case '0-15':
        filteredBooks = books.filter(
          (book) => book.price >= 0 && book.price <= 15
        );

        break;
      case '15-30':
        filteredBooks = books.filter(
          (book) => book.price >= 15 && book.price <= 30
        );

        break;
      case '30+':
        filteredBooks = books.filter((book) => book.price >= 30);
        break;
      default:
        setFilteredBooks(books);
        return filteredBooks;
    }
    setFilteredBooks(sortBooks(filteredBooks));
  };

  useEffect(() => {
    const results = filteredBooks.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  }, [searchTerm, filteredBooks]);

  return (
    <div className="wrapper">
      <Header />
      <main className="page">
        <div className="book-list">
          <div className="book-list__container">
            <div className="book-list__actions">
              <input
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by book name"
                type="search"
                className="book-list__search"
              />

              <select
                onChange={handlePriceChange}
                className="book-list__select"
                value={selectedPriceRange}
              >
                <option>All</option>
                <option>0-15</option>
                <option>15-30</option>
                <option>30+</option>
              </select>
            </div>
            <div className="book-list__cards book-cards">
              {searchResults?.map((book) => (
                <article className="book-cards__card" key={book.id}>
                  <Link to={`specific-book/${book.id}`}>
                    <div className="book-cards__img-ibg">
                      <img
                        src={book.image === '' ? imageNotFound : book.image}
                        alt="Book"
                      />
                    </div>
                  </Link>
                  <p
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                    className="book-cards__name"
                  >
                    {book.title}
                  </p>
                  <p className="book-cards__author">{book.author}</p>
                  <div className="book-cards__bottom">
                    <p className="book-cards__price">{book.price}</p>
                    <Link
                      data-testid="view"
                      to={`specific-book/${book.id}`}
                      className="book-cards__link button"
                    >
                      View
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default BookList;
