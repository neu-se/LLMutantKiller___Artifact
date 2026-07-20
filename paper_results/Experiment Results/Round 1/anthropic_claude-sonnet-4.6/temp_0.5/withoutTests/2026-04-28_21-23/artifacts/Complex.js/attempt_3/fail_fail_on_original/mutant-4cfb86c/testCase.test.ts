import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should handle acot with subnormal numbers where d underflows to 0', () => {
    // Use Number.MIN_VALUE which is the smallest positive number
    // MIN_VALUE * MIN_VALUE = 0 due to underflow
    const tiny = Number.MIN_VALUE;
    const c = new Complex(tiny, tiny);
    // d = tiny*tiny + tiny*tiny = 0 (underflow)
    // With original: a !== 0, so re = tiny/0 = Infinity; b !== 0, so im = -tiny/0 = -Infinity
    // atan(Infinity - Infinity*i) should give a specific result
    // With mutated: a === 0 is false, so re = 0; b !== 0, so im = -tiny/0 = -Infinity  
    // atan(0 - Infinity*i) gives different result
    const result = c.acot();
    // Original: atan(Infinity, -Infinity) 
    // The real part should not be 0
    expect(result.isNaN()).toBe(false);
    // In original code, re passed to atan = Infinity (a/0 where a=tiny≠0)
    // In mutated code, re passed to atan = 0 (since a===0 is false, returns 0)
    // These give different atan results
    const originalPath = new Complex(Infinity, -Infinity).atan();
    expect(result.re).toBeCloseTo(originalPath.re, 5);
  });
});