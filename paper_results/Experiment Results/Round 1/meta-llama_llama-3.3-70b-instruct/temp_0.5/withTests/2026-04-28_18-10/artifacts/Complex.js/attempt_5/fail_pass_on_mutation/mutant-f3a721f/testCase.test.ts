import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers with equal real parts and very close imaginary parts', () => {
    const c1 = new Complex(1, Complex['EPSILON']);
    const c2 = new Complex(1, 0);
    expect(c1.equals(c2)).toBe(true);
    const c3 = new Complex(1, Complex['EPSILON'] - 1e-16);
    expect(c3.equals(c2)).toBe(true);
    expect(c1.equals(c3)).toBe(true);
  });
});