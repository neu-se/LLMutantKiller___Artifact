import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const mutatedResult = new Complex(-Math.cos(1) * Math.sinh(1) * (0.5 * Math.cos(2) - 0.5 * Math.cosh(2)), Math.sin(1) * Math.sinh(1) / (0.5 * Math.cos(2) - 0.5 * Math.cosh(2)));
    expect(result.re).not.toBeCloseTo(mutatedResult.re, 5);
    expect(result.im).toBeCloseTo(mutatedResult.im, 5);
  });
});