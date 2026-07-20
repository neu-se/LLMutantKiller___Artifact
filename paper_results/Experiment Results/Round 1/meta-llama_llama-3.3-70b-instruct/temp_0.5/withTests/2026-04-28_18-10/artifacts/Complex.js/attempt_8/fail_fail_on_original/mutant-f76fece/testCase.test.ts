import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return true when comparing two complex numbers with exactly equal imaginary parts', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, 1);
    expect(c1.equals(c2)).toBe(true);
  });

  it('should return false when comparing two complex numbers with a difference in imaginary parts greater than epsilon', () => {
    const c1 = new Complex(1, 1 + Complex['EPSILON'] * 2);
    const c2 = new Complex(1, 1);
    expect(c1.equals(c2)).toBe(false);
  });
});