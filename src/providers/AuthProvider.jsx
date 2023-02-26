import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');

  const signIn = (newUser, cb) => {
    setUser(newUser);
    function cb() {}
  };
  const signOut = (cb) => {
    setUser(null);
    function cb() {}
  };
  const getUserName = (userName) => {
    setUserName(userName);
  };

  const value = {
    user,
    signIn,
    signOut,
    getUserName,
    userName,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
