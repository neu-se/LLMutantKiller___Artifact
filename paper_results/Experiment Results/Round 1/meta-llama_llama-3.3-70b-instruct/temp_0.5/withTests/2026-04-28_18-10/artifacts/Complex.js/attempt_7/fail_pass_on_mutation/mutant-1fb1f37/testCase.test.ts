import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return the correct result for cosh function', () => {
    const x = 1;
    const coshOriginal = Math.cosh;
    const result = coshOriginal(x);
    expect(result).toBeCloseTo((Math.exp(x) + Math.exp(-x)) * 0.5, 10);
    expect(coshOriginal.toString().includes('Math.cosh')).toBe(false);
    expect(coshOriginal.toString().includes('return Math.abs(x) < 1e-9 ? x : (Math.exp(x) + Math.exp(-x)) * 0.5;')).toBe(false);
  });
});