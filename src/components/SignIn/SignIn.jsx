import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import avatarBig from '../../img/login/big-avatar.png';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import useAuth from '../../hooks/useAuth';

const SignIn = () => {
  const [linkPointerEvents, setLinkPointerEvents] = useState('none');
  const [buttonColor, setButtonColor] = useState('grey');
  const [userError, setUserError] = useState('Please enter a name');
  const [userDirty, setUserDirty] = useState(false);
  const navigate = useNavigate();
  const { signIn, getUserName } = useAuth();

  const handleBlur = (e) => {
    if (e.target.name === 'username') setUserDirty(true);
  };

  const handleUser = (e) => {
    let userName = e.target.value;
    if (/^[A-Za-z][A-Za-z0-9_]{4,16}$/.test(userName)) {
      setUserError(null);
      setLinkPointerEvents('auto');
      setButtonColor('black');
      getUserName(userName);
      signIn(userName, () => navigate('book-list', { replace: true }));
    } else {
      setLinkPointerEvents('none');
      setButtonColor('grey');
      setUserError('Invalid name');
    }
  };

  return (
    <div className="wrapper">
      <Header display={'none'} />
      <main className="page">
        <div className="login">
          <div className="login__container">
            <div className="login__avatar">
              <img src={avatarBig} alt="avatar" />
            </div>
            <div className="login__body">
              <form action="" className="login__form">
                {userDirty && userError && (
                  <div style={{ color: '#ad2017', marginBottom: '10px' }}>
                    {userError}{' '}
                  </div>
                )}

                <label className="login__label" htmlFor="username">
                  Username
                </label>
                <input
                  data-testid="username"
                  onBlur={handleBlur}
                  onChange={handleUser}
                  name="username"
                  type="text"
                  className="login__input"
                  placeholder="type Username"
                  maxLength={16}
                />
                <Link
                  to="/book-list"
                  style={{
                    pointerEvents: linkPointerEvents,
                    alignSelf: 'center',
                  }}
                >
                  <button
                    className="login__btn"
                    style={{ background: buttonColor }}
                  >
                    {' '}
                    Sign In
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default SignIn;
