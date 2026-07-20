import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant', () => {
    const complex = new Complex(0.5, 0.5);
    const resultOriginal = new Complex(complex.re / (complex.re * complex.re + complex.im * complex.im), -complex.im / (complex.re * complex.re + complex.im * complex.im)).acos();
    const result = complex.asec();
    expect(result.re).toBeCloseTo(resultOriginal.re, 10);
    expect(result.im).toBeCloseTo(resultOriginal.im, 10);
  });
});