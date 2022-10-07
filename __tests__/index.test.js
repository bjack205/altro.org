import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  it('should render page', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /welcome/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
