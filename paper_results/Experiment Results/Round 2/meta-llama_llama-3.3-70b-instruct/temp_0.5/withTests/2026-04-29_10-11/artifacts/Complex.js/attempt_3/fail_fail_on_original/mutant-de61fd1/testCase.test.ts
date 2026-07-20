import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(2 * Math.cosh(2 * complex.re) * Math.cos(2 * complex.im) / (Math.cos(2 * complex.im) + Math.cosh(2 * complex.re)), 10);
    expect(result.im).toBeCloseTo(-2 * Math.sinh(2 * complex.re) * Math.sin(2 * complex.im) / (Math.cos(2 * complex.im) + Math.cosh(2 * complex.re)), 10);
  });
});