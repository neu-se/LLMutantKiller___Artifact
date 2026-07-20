import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex sech', () => {
    const z = new Complex(1, 1);
    const result = z.sech();
    const originalResult = new Complex(2 * Math.cosh(1) * Math.cos(1) / (Math.cos(2) + Math.cosh(2)), -2 * Math.sinh(1) * Math.sin(1) / (Math.cos(2) + Math.cosh(2)));
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});