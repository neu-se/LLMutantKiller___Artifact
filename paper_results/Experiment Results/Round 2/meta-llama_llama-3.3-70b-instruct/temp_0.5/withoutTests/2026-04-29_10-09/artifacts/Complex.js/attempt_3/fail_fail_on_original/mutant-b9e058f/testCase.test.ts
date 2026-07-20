import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle addition with two complex numbers correctly', () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.add(c2);
    expect(result.equals(Complex['INFINITY'])).toBe(true);
  });
});