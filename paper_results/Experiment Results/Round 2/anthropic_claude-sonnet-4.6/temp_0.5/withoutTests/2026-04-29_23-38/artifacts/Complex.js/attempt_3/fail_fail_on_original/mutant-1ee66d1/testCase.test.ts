import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc mutation detection', () => {
  it('detects mutation via subnormal input causing d underflow to 0', () => {
    const tiny = Number.MIN_VALUE;
    // tiny*tiny underflows to 0, so d = tiny^2 + tiny^2 = 0, but b = tiny != 0
    // Original: new Complex(tiny/0, -tiny/0).asin() = new Complex(Inf, -Inf).asin()
    // Mutant:   new Complex(tiny/0, -tiny*0).asin() = new Complex(Inf, 0).asin()
    const originalPath = new Complex(Infinity, -Infinity).asin();
    const mutantPath = new Complex(Infinity, 0).asin();
    
    // Verify these two paths give different results
    const areDifferent = 
      Math.abs(originalPath.re - mutantPath.re) > 1e-10 ||
      Math.abs(originalPath.im - mutantPath.im) > 1e-10 ||
      (isNaN(originalPath.re) !== isNaN(mutantPath.re)) ||
      (isNaN(originalPath.im) !== isNaN(mutantPath.im));
    expect(areDifferent).toBe(true);
    
    const c = new Complex(tiny, tiny);
    const result = c.acsc();
    
    // Result should match original path, not mutant path
    if (isNaN(originalPath.re)) {
      expect(isNaN(result.re)).toBe(true);
    } else {
      expect(result.re).toBeCloseTo(originalPath.re, 5);
    }
    if (isNaN(originalPath.im)) {
      expect(isNaN(result.im)).toBe(true);
    } else {
      expect(result.im).toBeCloseTo(originalPath.im, 5);
    }
  });
});