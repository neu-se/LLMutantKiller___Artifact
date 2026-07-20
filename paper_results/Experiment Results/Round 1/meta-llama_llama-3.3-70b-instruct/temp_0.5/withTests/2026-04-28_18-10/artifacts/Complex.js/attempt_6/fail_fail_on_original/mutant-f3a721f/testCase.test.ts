import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers with equal real parts and very close imaginary parts', () => {
    const epsilon = Complex['EPSILON'];
    const c1 = new Complex(1, epsilon);
    const c2 = new Complex(1, epsilon);
    expect(c1.equals(c2)).toBe(true);
    const c3 = new Complex(1, epsilon - 1e-16);
    expect(c3.equals(c2)).toBe(true);
    const c4 = new Complex(1, epsilon + 1e-16);
    expect(c4.equals(c2)).toBe(false);
  });
});