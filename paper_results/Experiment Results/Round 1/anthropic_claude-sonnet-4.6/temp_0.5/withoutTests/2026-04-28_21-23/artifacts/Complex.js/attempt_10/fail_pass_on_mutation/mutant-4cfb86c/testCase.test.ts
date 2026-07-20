import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should return NaN for acot of subnormal complex number', () => {
    const tiny = Number.MIN_VALUE;
    // Both a and b are subnormal, d underflows to 0
    // Original: atan(Inf, -Inf) -> NaN  
    // Mutated: atan(0, -Inf) -> NaN
    // Both NaN... 
    // BUT: what if we check the specific re value?
    const result = new Complex(tiny, tiny).acot();
    const mutatedResult = new Complex(0, -Infinity).atan(); // mutated path
    const originalResult = new Complex(Infinity, -Infinity).atan(); // original path
    // Both are NaN, but let's see if they're the same NaN
    expect(Object.is(result.re, originalResult.re)).toBe(true);
    expect(Object.is(result.im, originalResult.im)).toBe(true);
  });
});