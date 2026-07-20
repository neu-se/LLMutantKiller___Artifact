import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex sech', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    const originalResult = new Complex(2 * cosh(1) * Math.cos(1) / (Math.cos(2 * 1) + cosh(2 * 1)), -2 * sinh(1) * Math.sin(1) / (Math.cos(2 * 1) + cosh(2 * 1)));
    expect(result.re).toBeCloseTo(originalResult.re, 5);
    expect(result.im).toBeCloseTo(originalResult.im, 5);
  });
});