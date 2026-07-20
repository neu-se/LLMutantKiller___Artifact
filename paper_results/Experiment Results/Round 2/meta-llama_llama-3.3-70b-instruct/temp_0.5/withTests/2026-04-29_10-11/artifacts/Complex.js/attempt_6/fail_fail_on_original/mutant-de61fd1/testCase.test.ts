import { Complex } from "../../../complex.js";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(2 * Math.cosh(2 * complex.re) * Math.cos(2 * complex.im) / (Math.cos(2 * complex.im) + Math.cosh(2 * complex.re)), -2 * Math.sinh(2 * complex.re) * Math.sin(2 * complex.im) / (Math.cos(2 * complex.im) + Math.cosh(2 * complex.re)));
    const result = complex.sech();
    expect(result.re).toBeCloseTo(resultOriginal.re, 10);
    expect(result.im).toBeCloseTo(resultOriginal.im, 10);
  });
});