import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct cosecans value', () => {
    const complex = new Complex(1, 2);
    const result = complex.csc();
    const expectedReal = Math.sin(1) * Math.cosh(2) / (0.5 * Math.cosh(4) - 0.5 * Math.cos(2));
    const expectedImaginary = -Math.cos(1) * Math.sinh(2) / (0.5 * Math.cosh(4) - 0.5 * Math.cos(2));
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImaginary);
  });
});