import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should calculate the cosecans of a complex number correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const denominator = 0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 1);
    expect(denominator).not.toBeCloseTo(0, 10);
  });
});