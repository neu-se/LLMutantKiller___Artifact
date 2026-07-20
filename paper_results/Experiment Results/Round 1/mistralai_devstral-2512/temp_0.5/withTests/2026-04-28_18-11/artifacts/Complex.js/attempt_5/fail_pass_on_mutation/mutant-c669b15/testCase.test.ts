import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex division boundary condition', () => {
  it('should handle division when real and imaginary parts have exactly equal absolute values', () => {
    const numerator = new Complex(1, 1);
    const denominator = new Complex(1, -1);
    const result = numerator.div(denominator);
    const expected = new Complex(0, 1);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});