import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    const originalResult = new Complex((complex.re !== 0) ? complex.re / 0 : 0, (complex.im !== 0) ? -complex.im / 0 : 0).asinh();
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});