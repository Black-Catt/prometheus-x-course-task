import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import SignIn from './SignIn';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({
    signIn: jest.fn(),
    getUserName: jest.fn(),
  }),
}));

describe('SignIn', () => {
  it('should display an error message when an invalid username is entered', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    const input = screen.getByTestId('username');
    fireEvent.change(input, { target: { value: 'invalid username' } });
    fireEvent.blur(input);
    const errorMessage = screen.getByText('Invalid name');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should enable the Sign In button when a valid username is entered', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    const input = screen.getByTestId('username');
    fireEvent.change(input, { target: { value: 'valid_username' } });
    fireEvent.blur(input);
    const signInButton = screen.getByRole('button', { name: 'Sign In' });
    expect(signInButton).toBeEnabled();
  });
});
