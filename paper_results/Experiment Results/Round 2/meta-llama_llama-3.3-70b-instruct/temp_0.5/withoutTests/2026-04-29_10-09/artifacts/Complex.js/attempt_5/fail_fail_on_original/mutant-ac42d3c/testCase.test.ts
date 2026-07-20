import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not return NaN when b is -1 in atan', () => {
    const complex = new Complex(0, -1);
    const result = complex.atan();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});