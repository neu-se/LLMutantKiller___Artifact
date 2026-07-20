import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(2, 1);
    const result = complex.csc();
    const originalResult = new Complex(-Math.cos(2) * Math.sinh(1) / (0.5 * Math.cos(2) - 0.5 * Math.cosh(2)), Math.sin(2) * Math.sinh(1) / (0.5 * Math.cos(2) - 0.5 * Math.cosh(2)));
    expect(result.re).toBeCloseTo(originalResult.re, 5);
    expect(result.im).toBeCloseTo(originalResult.im, 5);
  });
});