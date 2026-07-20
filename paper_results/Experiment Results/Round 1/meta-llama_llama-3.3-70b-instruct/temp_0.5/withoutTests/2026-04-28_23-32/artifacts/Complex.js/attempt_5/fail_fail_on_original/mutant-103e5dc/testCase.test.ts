import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct cosecans value', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    const originalResult = new Complex(
      Math.sin(1) * Math.cosh(2) / (0.5 * Math.cosh(4) - 0.5 * Math.cos(2)),
      -Math.cos(1) * Math.sinh(2) / (0.5 * Math.cosh(4) - 0.5 * Math.cos(2))
    );
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});