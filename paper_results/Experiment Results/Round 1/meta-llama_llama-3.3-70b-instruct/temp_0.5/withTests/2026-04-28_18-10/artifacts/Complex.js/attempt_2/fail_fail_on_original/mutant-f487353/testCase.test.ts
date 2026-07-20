import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should return the correct value for csc', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    expect(result.im).not.toBeCloseTo(Math.cos(1) * Math.sinh(2) / (0.5 * Math.cos(2 * 1) - 0.5 * Math.cosh(2 * 2)), 10);
  });
});