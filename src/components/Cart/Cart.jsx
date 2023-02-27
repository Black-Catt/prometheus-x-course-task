import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import EmptyCart from './EmptyCart';

import useCart from '../../hooks/useCart';
import useBooks from '../../hooks/useBooks';
import { useNavigate, Link } from 'react-router-dom';
import arrowImg from '../../img/specific-book/arrow.svg';

const Cart = () => {
  const { imageNotFound } = useBooks();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const cartItems = JSON.parse(localStorage.getItem('books'));

  if (!cartItems) {
    return <EmptyCart />;
  }
  const price = cartItems.reduce((acc, el) => acc + +el.price, 0);

  return (
    <div className="wrapper">
      <Header />
      <main className="page">
        <div className="cart">
          <div className="cart__container">
            <button
              className="back-btn "
              onClick={() => navigate(-1)}
              to="book-list"
            >
              <img src={arrowImg} alt="back-arrow" />
            </button>
            <div className="cart__rows">
              {cartItems?.map((book, index) => (
                <div key={index} className="cart__row row-cart">
                  <div className="row-cart__body">
                    <div className="row-cart__book">
                      <div className="row-cart__img">
                        <img
                          src={book.image === '' ? imageNotFound : book.image}
                          alt="Book"
                        />
                      </div>
                      <p className="row-cart__name">{book.title}</p>
                    </div>
                  </div>
                  <div className="row-cart__items">
                    <div className="row-cart__count">
                      {isNaN(book.count) ? 1 : book.count}
                    </div>
                    <div className="row-cart__cost">{book.price}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart__bottom">
              <div className="cart__price">
                Total price, <span>{price.toFixed(2)}</span>$
              </div>
              <button onClick={() => clearCart()} className="cart__btn button">
                Purchase
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Cart;
