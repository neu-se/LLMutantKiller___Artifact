import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the same result for the acsch function as a known implementation', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    const expectedRe = result.re;
    const expectedIm = result.im;
    const originalCodeResult = new Complex(1, 2).acsch();
    expect(result.re).toBeCloseTo(originalCodeResult.re, 5);
    expect(result.im).toBeCloseTo(originalCodeResult.im, 5);
  });
});