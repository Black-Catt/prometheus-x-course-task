import { Link, useNavigate } from 'react-router-dom';

import cart from '../../img/header/cart.svg';
import avatar from '../../img/login/avatar.svg';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';

const Header = ({ display }) => {
  const { signOut, userName } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  return (
    <header data-testid="header-component" className="header">
      <div data-testid="header-container" className="header__container">
        <h2 data-testid="header-tag" className="header__tag">
          X-course-task/Zaharchenko Anton
        </h2>
        <div className="header__actions">
          <div
            data-testid="header-menu"
            style={{ display: display }}
            className="header__menu mennu"
          >
            <div className="menu__body">
              <Link data-testid="menu-cart" to="/cart" className="menu__cart">
                <img src={cart} alt="cart" />
                <span
                  style={{
                    display:
                      localStorage.getItem('bookQuantity') === null
                        ? 'none'
                        : 'flex',
                  }}
                  id="book-quantity"
                >
                  {+localStorage.getItem('bookQuantity') >= 99
                    ? '99+'
                    : localStorage.getItem('bookQuantity')}
                </span>
              </Link>
              <Link
                data-testid="menu-button"
                onClick={() => signOut(navigate('/'))}
                className="menu__button hidden"
              >
                Sign Out
              </Link>
              <div className="menu__avatar hidden">
                <img data-testid="menu-avatar" src={avatar} alt="avatar" />
              </div>
              <p className="menu__user hidden">{userName}</p>
            </div>
            <div className="spollers _spoller-init">
              <div className="spollers__item">
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`spollers__title ${
                    isActive ? '_spoller-active' : ''
                  }`}
                >
                  <div className="menu__avatar">
                    <img src={avatar} alt="avatar" />
                  </div>
                </button>
                {isActive && (
                  <div className="spollers__body">
                    <p className="menu__user">{userName}</p>
                    <Link
                      data-testid="menu-button"
                      onClick={() => signOut(navigate('/'))}
                      className="menu__button"
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
