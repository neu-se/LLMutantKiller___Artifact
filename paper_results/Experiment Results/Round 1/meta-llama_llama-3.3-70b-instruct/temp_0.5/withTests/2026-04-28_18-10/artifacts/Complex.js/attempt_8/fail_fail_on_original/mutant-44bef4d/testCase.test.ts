import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return a different result for acsc when the implementation is correct', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    const mutatedResult = new Complex(-2 * complex.re, complex.asin().re);
    expect(result.re).not.toBeCloseTo(mutatedResult.re, 5);
    expect(result.im).not.toBeCloseTo(mutatedResult.im, 5);
  });
});