import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle multiplication of infinite and zero complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(0, 0);
    const result = c1.mul(c2);
    const c3 = new Complex(0, 0);
    const c4 = new Complex(Infinity, Infinity);
    const result2 = c3.mul(c4);
    expect(result.equals(result2)).toBe(true);
  });
});