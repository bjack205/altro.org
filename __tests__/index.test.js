import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('Home', () => {
  it('should render page', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /ALTRO beats most solvers./i,
    });
    expect(heading).toBeInTheDocument();
  });
});
