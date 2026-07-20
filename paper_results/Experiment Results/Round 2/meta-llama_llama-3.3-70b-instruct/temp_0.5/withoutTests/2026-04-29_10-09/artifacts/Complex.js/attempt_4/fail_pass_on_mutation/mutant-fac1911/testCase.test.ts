import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a result with a non-zero denominator for the acsch function', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    const denominator = result.re * result.re + result.im * result.im;
    expect(denominator).not.toBeCloseTo(0, 5);
  });
});