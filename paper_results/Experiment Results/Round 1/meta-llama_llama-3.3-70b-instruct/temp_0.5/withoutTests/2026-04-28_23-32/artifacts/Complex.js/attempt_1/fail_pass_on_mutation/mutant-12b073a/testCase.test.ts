import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate the complex hyperbolic sine correctly', () => {
    const complex = new Complex(1, 1);
    const sinh = complex.sinh();
    const expected = new Complex(Math.sinh(1) * Math.cos(1), Math.cosh(1) * Math.sin(1));
    expect(sinh.re).toBeCloseTo(expected.re);
    expect(sinh.im).toBeCloseTo(expected.im);
  });
});