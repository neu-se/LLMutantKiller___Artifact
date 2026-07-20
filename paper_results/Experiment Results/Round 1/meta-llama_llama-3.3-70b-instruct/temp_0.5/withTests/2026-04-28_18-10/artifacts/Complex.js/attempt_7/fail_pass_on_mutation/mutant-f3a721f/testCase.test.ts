import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers with equal real parts and very close imaginary parts', () => {
    const epsilon = Complex['EPSILON'];
    const c1 = new Complex(1, epsilon);
    const c2 = new Complex(1, 0);
    expect(c1.equals(c2)).toBe(true);
  });
});