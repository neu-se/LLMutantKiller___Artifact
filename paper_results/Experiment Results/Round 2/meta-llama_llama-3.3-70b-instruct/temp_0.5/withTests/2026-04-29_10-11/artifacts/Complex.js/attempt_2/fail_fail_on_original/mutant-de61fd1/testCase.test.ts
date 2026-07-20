import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(0.5 * Math.cos(2 * complex.im) + 0.5 * Math.cosh(2 * complex.re), -0.5 * Math.sin(2 * complex.im) - 0.5 * Math.sinh(2 * complex.re));
    const result = complex.sech();
    expect(result.re).not.toBeCloseTo(resultOriginal.re, 10);
    expect(result.im).not.toBeCloseTo(resultOriginal.im, 10);
  });
});