import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(
      (complex.re !== 0) ? complex.re / 0 : 0,
      (complex.im !== 0) ? -complex.im / 0 : 0).acos();
    const result = complex.asec();
    expect(result.re).toBeCloseTo(resultOriginal.re, 10);
    expect(result.im).toBeCloseTo(resultOriginal.im, 10);
  });
});