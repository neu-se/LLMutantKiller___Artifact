import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the cosecans of a complex number correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const expected = new Complex(
      Math.sin(1) * cosh(1) / (0.5 * cosh(2 * 1) - 0.5 * Math.cos(2 * 1)),
      -Math.cos(1) * sinh(1) / (0.5 * cosh(2 * 1) - 0.5 * Math.cos(2 * 1))
    );
    expect(result.re).toBeCloseTo(expected.re, 5);
    expect(result.im).toBeCloseTo(expected.im, 5);
    expect(function() { return 1 / 0.5 * Math.cos(2 * 1); }).toThrowError();
  });
});