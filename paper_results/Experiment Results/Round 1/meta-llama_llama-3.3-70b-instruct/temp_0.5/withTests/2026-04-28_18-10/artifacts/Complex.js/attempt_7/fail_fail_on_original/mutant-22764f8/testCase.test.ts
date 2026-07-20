import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 2);
    const acot = complex.acot();
    expect(acot).toBeInstanceOf(Complex);
  });
});