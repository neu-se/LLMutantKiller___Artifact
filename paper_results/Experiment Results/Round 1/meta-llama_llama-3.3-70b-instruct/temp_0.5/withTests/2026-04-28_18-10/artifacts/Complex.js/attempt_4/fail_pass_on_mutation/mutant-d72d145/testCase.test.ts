import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a result for acsc that is not NaN or Infinity', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});