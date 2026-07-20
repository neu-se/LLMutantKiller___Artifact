import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for asech', () => {
    const complex = new Complex(0.5, 0.5);
    const result = complex.asech();
    const originalResult = new Complex(0.5, -0.5).acosh();
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});