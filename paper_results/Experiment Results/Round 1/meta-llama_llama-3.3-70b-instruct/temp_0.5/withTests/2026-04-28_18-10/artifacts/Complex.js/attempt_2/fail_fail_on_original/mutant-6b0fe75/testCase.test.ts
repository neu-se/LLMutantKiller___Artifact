import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate the hyperbolic cosine', () => {
    const complex = new Complex(1, 0);
    const coshValue = complex.cosh();
    expect(coshValue.re).toBeCloseTo(Math.cosh(1));
    expect(coshValue.im).toBeCloseTo(0);
  });
});