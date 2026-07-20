import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.sec();
    const expected = new Complex(
      Math.cos(1) * cosh(2) / (0.5 * cosh(2 * 2) + 0.5 * Math.cos(2 * 1)),
      Math.sin(1) * sinh(2) / (0.5 * cosh(2 * 2) + 0.5 * Math.cos(2 * 1))
    );
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});