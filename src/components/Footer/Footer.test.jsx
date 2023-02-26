import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';

describe('Footer Component', () => {
  it('should contain footer container, copy and links', () => {
    render(<Footer />);

    // Test footer container
    expect(screen.getByTestId('footer-component')).toBeInTheDocument();
    expect(screen.getByTestId('footer-container')).toBeInTheDocument();
    expect(screen.getByTestId('footer-copy')).toBeInTheDocument();
    expect(screen.getByTestId('prometheus-link')).toBeInTheDocument();
  });

  it('should display correct content and link', () => {
    render(<Footer />);

    // Test content
    expect(screen.getByTestId('footer-copy')).toHaveTextContent(
      'Made in Prometheus © 2022'
    );

    // Test link address
    expect(screen.getByTestId('prometheus-link')).toHaveAttribute(
      'href',
      'https://prometheus.org.ua/'
    );
  });
});
