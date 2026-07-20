import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a finite result for acsch', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(!isNaN(result.re) && !isFinite(result.re)).toBe(false);
    expect(!isNaN(result.im) && !isFinite(result.im)).toBe(false);
    const complex2 = new Complex(0, 0);
    const result2 = complex2.acsch();
    expect(isNaN(result2.re)).toBe(true);
    expect(isNaN(result2.im)).toBe(true);
  });
});