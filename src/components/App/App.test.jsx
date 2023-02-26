import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App component', () => {
  test('renders sign in page on load', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const signInElement = screen.getByText(/Sign In/i);
    expect(signInElement).toBeInTheDocument();
  });

  test('renders error page when path does not match any of the routes', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-path']}>
        <App />
      </MemoryRouter>
    );

    const errorElement = screen.getByAltText(/404 error/i);
    expect(errorElement).toBeInTheDocument();
  });
});
