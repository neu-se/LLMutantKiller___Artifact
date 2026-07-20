import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(
      (complex.re !== 0) ? complex.re / 0 : 0,
      (complex.im !== 0) ? -complex.im / 0 : 0).acos();
    const resultMutated = new Complex(
      (complex.re !== 0) ? complex.re / 0 : 0,
      (complex.im !== 0) ? +complex.im / 0 : 0).acos();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 10);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 10);
  });
});