import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    const expectedRe = result.re;
    const expectedIm = result.im;
    const mutatedComplex = new Complex(1, 1);
    mutatedComplex.acsc = function() {
      const a = this.re;
      const b = this.im;
      const d = a * a + b * b;
      return new Complex(
        a / d,
        -b * d).asin();
    };
    const mutatedResult = mutatedComplex.acsc();
    expect(result.re).not.toBeCloseTo(mutatedResult.re, 10);
    expect(result.im).not.toBeCloseTo(mutatedResult.im, 10);
  });
});