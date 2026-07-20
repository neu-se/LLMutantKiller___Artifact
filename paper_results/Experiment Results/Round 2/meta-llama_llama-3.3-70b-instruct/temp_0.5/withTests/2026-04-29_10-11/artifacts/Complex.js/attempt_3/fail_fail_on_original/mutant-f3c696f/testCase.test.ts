import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct result for acot', () => {
    const complex = new Complex(1, 1);
    const result = complex.acot();
    const originalResult = new Complex(
      (1 / (1 * 1 + 1 * 1)),
      (-1 / (1 * 1 + 1 * 1))
    ).atan();
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});