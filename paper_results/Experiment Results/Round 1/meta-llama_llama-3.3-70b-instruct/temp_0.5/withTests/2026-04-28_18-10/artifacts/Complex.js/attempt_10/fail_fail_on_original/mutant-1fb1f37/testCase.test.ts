import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return the correct result for cosh function', () => {
    const x = 1;
    const result = Math.cosh(x);
    expect(result).toBeCloseTo((Math.exp(x) + Math.exp(-x)) * 0.5, 10);
    const originalCosh = Math.cosh;
    Math.cosh = function(x) { return x; };
    expect(Math.cosh.toString()).not.toContain('return x');
    Math.cosh = originalCosh;
  });
});