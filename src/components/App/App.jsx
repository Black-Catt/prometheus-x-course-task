import { Routes, Route } from 'react-router-dom';
import Cart from '../Cart/Cart';
import SignIn from '../SignIn/SignIn';
import BookList from '../BookList/BookList';
import SpecificBook from '../SpecificBook/SpecificBook';
import Error from '../Error/Error';
import RequireAuth from '../../hoc/RequireAuth';
import { AuthProvider } from '../../providers/AuthProvider';
import { BooksProvider } from '../../providers/BooksProvider';
import { CartProvider } from '../../providers/CartProvider';

function App() {
  return (
    <AuthProvider>
      <BooksProvider>
        <CartProvider>
          <Routes>
            <Route index element={<SignIn />} />
            <Route
              path="/cart"
              element={
                <RequireAuth>
                  <Cart />
                </RequireAuth>
              }
            />
            <Route
              path="book-list"
              element={
                <RequireAuth>
                  <BookList />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="book-list/specific-book/:bookId"
              element={
                <RequireAuth>
                  <SpecificBook />
                </RequireAuth>
              }
            />
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </CartProvider>
      </BooksProvider>
    </AuthProvider>
  );
}

export default App;
