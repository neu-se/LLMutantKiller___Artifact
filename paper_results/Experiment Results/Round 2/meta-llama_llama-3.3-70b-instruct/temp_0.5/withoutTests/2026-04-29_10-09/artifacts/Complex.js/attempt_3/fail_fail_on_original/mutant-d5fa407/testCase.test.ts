import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acot correctly for b !== 0', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    const originalResult = new Complex((complex.re / (complex.re * complex.re + complex.im * complex.im)), (-complex.im / (complex.re * complex.re + complex.im * complex.im))).atan();
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});