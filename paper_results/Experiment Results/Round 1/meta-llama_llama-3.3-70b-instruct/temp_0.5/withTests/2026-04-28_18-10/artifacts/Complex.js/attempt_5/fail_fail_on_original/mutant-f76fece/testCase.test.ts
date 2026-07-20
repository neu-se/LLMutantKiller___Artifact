import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return true when comparing two complex numbers with equal imaginary parts and a difference in imaginary parts less than or equal to epsilon', () => {
    const c1 = new Complex(1, 1 + Complex['EPSILON']);
    const c2 = new Complex(1, 1);
    expect(c1.equals(c2)).toBe(true);
  });
});