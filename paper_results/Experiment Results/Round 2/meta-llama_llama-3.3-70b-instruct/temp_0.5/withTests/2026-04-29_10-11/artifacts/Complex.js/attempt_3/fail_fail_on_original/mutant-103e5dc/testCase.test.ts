import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(2, 1);
    const result = complex.csc();
    const originalResult = new Complex(
      Math.sin(2) * Math.cosh(1) / (0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 2)),
      -Math.cos(2) * Math.sinh(1) / (0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 2))
    );
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});