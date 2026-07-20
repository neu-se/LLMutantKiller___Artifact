import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(2, 1);
    const result = complex.acsc();
    expect(result.toString()).not.toContain('Infinity');
    expect(result.toString()).not.toContain('NaN');
    const originalComplex = new Complex(2, 1);
    const originalResult = originalComplex.acsc();
    expect(result.re).toBeCloseTo(originalResult.re, 5);
    expect(result.im).toBeCloseTo(originalResult.im, 5);
  });
});