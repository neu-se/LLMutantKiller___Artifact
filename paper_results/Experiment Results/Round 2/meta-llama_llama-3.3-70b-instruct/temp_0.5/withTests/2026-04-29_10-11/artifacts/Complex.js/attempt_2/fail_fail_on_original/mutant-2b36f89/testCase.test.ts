import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const originalResult = new Complex(
      Math.sin(complex.re) * Math.cosh(complex.im) / (0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re)),
      -Math.cos(complex.re) * Math.sinh(complex.im) / (0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re))
    );
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});