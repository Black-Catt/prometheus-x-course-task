import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Error from './Error';

describe('Error Component', () => {
  test('component renders correctly', () => {
    render(<Error />);

    // Check if error image is rendered
    expect(screen.getByAltText('404 error')).toBeInTheDocument();
  });
});
