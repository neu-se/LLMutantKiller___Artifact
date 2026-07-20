import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle multiplication with zero and a non-zero complex number', () => {
    const c1 = new Complex(0, 0);
    const c2 = new Complex(1, 1);
    const result = c1.mul(c2);
    expect(result.equals(new Complex(0, 0))).toBe(true);
  });
});