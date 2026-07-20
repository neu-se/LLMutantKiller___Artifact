import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle subtraction with infinite values', () => {
    const c1 = new Complex(Infinity, 0);
    const c2 = new Complex(1, 0);
    const result = c1.sub(c2);
    expect(result.equals(Complex.INFINITY)).toBe(true);
  });
});