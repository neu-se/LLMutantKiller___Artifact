import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex division edge case', () => {
  it('should correctly handle division when |c| == |d|', () => {
    const numerator = new Complex(3, 2);
    const denominator = new Complex(2, 3);
    const result = numerator.div(denominator);
    const expected = new Complex(0.9230769230769231, -0.38461538461538464);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});