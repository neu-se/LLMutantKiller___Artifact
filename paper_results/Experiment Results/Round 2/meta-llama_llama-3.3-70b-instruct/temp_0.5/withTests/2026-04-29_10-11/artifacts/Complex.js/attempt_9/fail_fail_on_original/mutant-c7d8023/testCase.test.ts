import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for acsch when b is zero and a is not zero, and different from when b is not zero', () => {
    const complex1 = new Complex(1, 0);
    const complex2 = new Complex(1, 1);
    const result1 = complex1.acsch();
    const result2 = complex2.acsch();
    expect(result1.re).not.toBeCloseTo(result2.re, 10);
    expect(isFinite(result1.im)).toBe(false);
  });
});