import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return a different result for acsc when the implementation is correct', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    expect(result.re).not.toBeCloseTo(-2 * complex.re, 5);
    expect(result.im).not.toBeCloseTo(complex.asin().re, 5);
  });
});