import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../providers/AuthProvider';

describe('Header Component', () => {
  it('should contain header container, tag, menu, cart and button', () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Header display={'auto'} />
        </MemoryRouter>
      </AuthProvider>
    );
    // Test header container
    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('header-container')).toBeInTheDocument();
    expect(screen.getByTestId('header-tag')).toBeInTheDocument();
    expect(screen.getByTestId('header-menu')).toBeInTheDocument();
    expect(screen.getByTestId('menu-cart')).toBeInTheDocument();
    expect(screen.getByTestId('menu-button')).toBeInTheDocument();
  });

  it('should display content correctly and sign out after clicking on the button', async () => {
    const mockSignOut = jest.fn();
    const mockNavigate = jest.fn();

    render(
      <AuthProvider value={{ mockSignOut }}>
        <MemoryRouter>
          <Header display={'auto'} />
        </MemoryRouter>
      </AuthProvider>
    );

    const linkCart = screen.getByTestId('menu-cart');
    const linkButton = screen.getByTestId('menu-button');
    const userAvatar = screen.getByTestId('menu-avatar');

    expect(linkCart).toHaveAttribute('href', '/cart');
    expect(userAvatar).toHaveAttribute('src', 'avatar.svg');

    fireEvent.click(linkButton);
    await mockSignOut(mockNavigate('/'));

    expect(mockSignOut).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
