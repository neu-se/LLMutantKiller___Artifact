import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the cosecans of a complex number correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const originalResult = new Complex(
      Math.sin(1) * cosh(1) / (0.5 * cosh(2 * 1) - 0.5 * Math.cos(2 * 1)),
      -Math.cos(1) * sinh(1) / (0.5 * cosh(2 * 1) - 0.5 * Math.cos(2 * 1))
    );
    expect(result.re).toBeCloseTo(originalResult.re, 5);
    expect(result.im).toBeCloseTo(originalResult.im, 5);
  });
});