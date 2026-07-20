import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(2 * complex.cosh().re * Math.cos(complex.im) / (Math.cos(2 * complex.im) + complex.cosh(2 * complex.re)), 1e-10);
    expect(result.im).toBeCloseTo(-2 * complex.sinh().re * Math.sin(complex.im) / (Math.cos(2 * complex.im) + complex.cosh(2 * complex.re)), 1e-10);
  });
});