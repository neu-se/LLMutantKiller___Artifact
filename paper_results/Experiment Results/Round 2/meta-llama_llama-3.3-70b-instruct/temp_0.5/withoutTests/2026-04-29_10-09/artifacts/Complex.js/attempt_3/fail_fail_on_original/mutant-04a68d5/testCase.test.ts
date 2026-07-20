import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 0);
    const sech = complex.sech();
    expect(sech.re).toBeCloseTo(2 * complex.cosh().re * Math.cos(complex.im) / (Math.cos(2 * complex.im) + complex.cosh(2 * complex.re)), 1e-10);
    expect(sech.im).toBeCloseTo(-2 * complex.sinh().re * Math.sin(complex.im) / (Math.cos(2 * complex.im) + complex.cosh(2 * complex.re)), 1e-10);
  });
});