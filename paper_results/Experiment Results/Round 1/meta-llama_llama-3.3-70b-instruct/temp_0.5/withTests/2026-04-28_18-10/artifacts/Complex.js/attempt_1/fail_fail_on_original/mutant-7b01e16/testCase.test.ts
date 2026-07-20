import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly handle multiplication of infinite and zero complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(0, 0);
    const result = c1.mul(c2);
    expect(result.isNaN()).toBe(true);
  });
});