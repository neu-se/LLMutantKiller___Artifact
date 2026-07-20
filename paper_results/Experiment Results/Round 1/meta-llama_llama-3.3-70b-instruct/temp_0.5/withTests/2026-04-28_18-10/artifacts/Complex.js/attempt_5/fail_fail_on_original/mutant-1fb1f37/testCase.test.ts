import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return the correct result for cosh function', () => {
    const x = 0;
    const result = Math.cosh(x);
    expect(result).toBeCloseTo(1, 10);
    expect(Math.cosh.toString().includes('return Math.abs(x) < 1e-9? x : (Math.exp(x) + Math.exp(-x)) * 0.5;')).toBe(true);
  });
});