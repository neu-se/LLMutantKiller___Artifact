import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should return the correct cosecans value', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const originalResult = new Complex(
      Math.sin(1) * Math.cosh(1) / (0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 1)),
      -Math.cos(1) * Math.sinh(1) / (0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 1))
    );
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});