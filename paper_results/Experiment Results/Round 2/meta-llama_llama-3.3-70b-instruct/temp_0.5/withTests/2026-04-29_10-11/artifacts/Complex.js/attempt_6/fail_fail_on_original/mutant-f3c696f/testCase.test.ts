import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acot', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    const expectedRe = (1 / (1 * 1 + 1 * 1));
    const expectedIm = (-1 / (1 * 1 + 1 * 1));
    const expected = new Complex(expectedRe, expectedIm).atan();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});