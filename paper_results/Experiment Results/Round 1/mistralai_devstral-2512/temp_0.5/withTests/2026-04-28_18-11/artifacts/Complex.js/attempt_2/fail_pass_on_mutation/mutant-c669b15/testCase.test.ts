import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex division edge case', () => {
  it('should correctly handle division when |c| == |d|', () => {
    const a = new Complex(1, 1);
    const b = new Complex(1, 1);
    const result = a.div(b);
    const expected = new Complex(1, 0);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});