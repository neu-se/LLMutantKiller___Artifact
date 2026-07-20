import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex division edge case', () => {
  it('should correctly handle division when |c| == |d| with specific values', () => {
    const numerator = new Complex(5, 5);
    const denominator = new Complex(5, 5);
    const result = numerator.div(denominator);
    const expected = new Complex(1, 0);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});