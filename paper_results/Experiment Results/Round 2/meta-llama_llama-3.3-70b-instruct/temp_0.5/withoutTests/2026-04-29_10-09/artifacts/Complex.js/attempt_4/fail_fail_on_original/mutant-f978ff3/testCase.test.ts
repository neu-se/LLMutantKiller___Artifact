import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex csch', () => {
    const complex = new Complex(1, 1);
    const result = complex.csch();
    const originalResult = new Complex(-2 * Math.sinh(1) * Math.cos(1) / (Math.cos(2) - Math.cosh(2)), -2 * Math.cosh(1) * Math.sin(1) / (Math.cos(2) - Math.cosh(2)));
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});