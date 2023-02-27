import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import hideImg from '../../img/specific-book/hide.svg';
import moreImg from '../../img/specific-book/more.svg';

import useCart from '../../hooks/useCart';
import useBooks from '../../hooks/useBooks';

import arrowImg from '../../img/specific-book/arrow.svg';

const SpecificBook = () => {
  const { books, imageNotFound } = useBooks();
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [countValue, setCountValue] = useState(1);
  const book = books.find((book) => book.id === +bookId);
  const [total, setTotal] = useState(book.price);
  const [showMore, setShowMore] = useState(false);

  const handleTotal = (e) => {
    let newValue = parseInt(e.target.value);
    setCountValue(newValue < 1 ? 1 : newValue > 42 ? 42 : newValue);
  };
  useEffect(() => {
    setTotal(
      (isNaN(countValue) ? book.price : book.price * countValue).toFixed(2)
    );
  }, [countValue, book.price]);

  return (
    <div className="wrapper">
      <Header />
      <main className="page">
        <div data-testid="specific-book" className="book">
          <div className="book__container">
            <button
              href=""
              className="back-btn"
              onClick={() => navigate(-1)}
              to="book-list"
            >
              <img src={arrowImg} alt="back-arrow" />
            </button>
            {
              <div className="book__row">
                <div className="book__main">
                  <div className="book__img-ibg">
                    <img
                      src={book.image === '' ? imageNotFound : book.image}
                      alt="Book"
                    />
                  </div>
                  <div className="description">
                    <div
                      className={`description__content  ${
                        showMore ? '_showmore-active' : ''
                      }`}
                    >
                      <div className="description__text">
                        {showMore
                          ? book.description
                          : `${book.description.substring(0, 240)}`}
                      </div>
                    </div>
                    <button
                      className="description__more"
                      onClick={() => setShowMore(!showMore)}
                    >
                      {!showMore ? (
                        <img src={moreImg} alt="more" />
                      ) : (
                        <img src={hideImg} alt="hide" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="book__inner">
                  <div className="book__short short-book">
                    <h5 className="short-book__title">{book.title}</h5>
                    <p className="short-book__author">{book.author}</p>
                    <p className="short-book__lang">English</p>
                    <p className="short-book__tags">{book.tag}</p>
                  </div>
                  <div className="book__payment">
                    <div className="price">
                      <p className="price__tag">Price,$</p>
                      <span className="price__num">{book.price}</span>
                    </div>
                    <div className="count">
                      <div className="count__tag">Count</div>
                      <input
                        data-testid="quantity-display"
                        max={42}
                        min={1}
                        value={countValue}
                        type="number"
                        className="count__input"
                        onChange={handleTotal}
                      />
                    </div>
                    <div className="total">
                      <div className="total__tag">Total price:</div>
                      <span className="total__price">{total}</span>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(book, countValue, total);
                      }}
                      type="button"
                      className="book__btn button"
                      data-testid="book-btn"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SpecificBook;
