import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(result.re).toBeCloseTo(Math.sin(1) * Math.cosh(1) / (0.5 * Math.cos(2) + 0.5 * Math.cosh(2)), 1e-10);
    expect(result.im).toBeCloseTo(-Math.cos(1) * Math.sinh(1) / (0.5 * Math.cos(2) + 0.5 * Math.cosh(2)), 1e-10);
  });
});