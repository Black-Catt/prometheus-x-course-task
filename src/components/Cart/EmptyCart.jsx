import bigCartImg from '../../img/empty/big-cart.svg';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useNavigate, Link } from 'react-router-dom';
import arrowImg from '../../img/specific-book/arrow.svg';

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <Header />
      <main className="empty">
        <div className="empty__container">
          <Link
            className="back-btn "
            onClick={() => navigate(-1)}
            to="book-list"
          >
            <img src={arrowImg} alt="back-arrow" />
          </Link>
          <div className="empty__content">
            <button disabled className="empty__btn">
              Purchase
            </button>
            <div className="empty__img">
              <img src={bigCartImg} alt="cart" />
            </div>
            <p className="empty__text">Cart is empty</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default EmptyCart;
