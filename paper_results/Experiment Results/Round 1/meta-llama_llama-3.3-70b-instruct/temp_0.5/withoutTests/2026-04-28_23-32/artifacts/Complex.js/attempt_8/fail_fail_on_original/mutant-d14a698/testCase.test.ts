import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a complex number with a real part of 1 and an imaginary part of 1', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(
      (complex.re !== 0) ? complex.re / (complex.re * complex.re + complex.im * complex.im) : 0,
      (complex.im !== 0) ? -complex.im / (complex.re * complex.re + complex.im * complex.im) : 0).acos();
    const result = complex.asec();
    expect(result.re).toBeCloseTo(resultOriginal.re, 10);
    expect(result.im).toBeCloseTo(resultOriginal.im, 10);
  });
});