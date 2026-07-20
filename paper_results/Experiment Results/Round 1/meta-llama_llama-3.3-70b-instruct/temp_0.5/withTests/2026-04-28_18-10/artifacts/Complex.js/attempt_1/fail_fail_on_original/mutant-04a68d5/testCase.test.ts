import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate sech correctly', () => {
    const complex = new Complex(1, 2);
    const sech = complex.sech();
    expect(sech.re).toBeCloseTo(2 * complex.re / (Math.cos(4 * complex.im) + Math.cosh(4 * complex.re)), 10);
    expect(sech.im).toBeCloseTo(-2 * complex.im / (Math.cos(4 * complex.im) + Math.cosh(4 * complex.re)), 10);
  });
});