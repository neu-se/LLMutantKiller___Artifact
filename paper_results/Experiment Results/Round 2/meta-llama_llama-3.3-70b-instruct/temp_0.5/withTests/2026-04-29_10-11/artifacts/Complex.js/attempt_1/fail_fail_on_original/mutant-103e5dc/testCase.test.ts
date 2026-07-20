import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    const expected = new Complex(
      Math.sin(complex.re) * Math.cosh(complex.im) / (0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re)),
      -Math.cos(complex.re) * Math.sinh(complex.im) / (0.5 * Math.cosh(2 * complex.im) - 0.5 * Math.cos(2 * complex.re))
    );
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});