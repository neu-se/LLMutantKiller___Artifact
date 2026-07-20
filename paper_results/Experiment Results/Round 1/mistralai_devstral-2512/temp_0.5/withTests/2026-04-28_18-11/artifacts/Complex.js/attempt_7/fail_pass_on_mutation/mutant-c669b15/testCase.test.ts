import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex division boundary condition', () => {
  it('should handle division when |c| == |d| with specific values', () => {
    const numerator = new Complex(1, 2);
    const denominator = new Complex(2, 1);
    const result = numerator.div(denominator);
    const expected = new Complex(0.8, 0.6);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});