import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a result that is consistent with the definition of the acsch function', () => {
    const complex = new Complex(2, 1);
    const result = complex.acsch();
    const expected = new Complex(complex.re / (complex.re * complex.re + complex.im * complex.im), -complex.im / (complex.re * complex.re + complex.im * complex.im)).asinh();
    expect(result.re).toBeCloseTo(expected.re, 5);
    expect(result.im).toBeCloseTo(expected.im, 5);
  });
});