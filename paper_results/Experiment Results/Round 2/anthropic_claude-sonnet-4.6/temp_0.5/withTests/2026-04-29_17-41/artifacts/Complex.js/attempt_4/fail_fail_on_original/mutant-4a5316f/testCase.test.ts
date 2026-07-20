import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('detects sign mutation in acoth else branch via underflow', () => {
    const tiny = Number.MIN_VALUE;
    // With a=tiny, b=tiny: d = tiny^2 + tiny^2 underflows to 0
    // Early return not triggered since a !== 0
    // Original: new Complex(tiny/0, -tiny/0).atanh() = new Complex(Inf, -Inf).atanh()
    // Mutated:  new Complex(tiny/0, +tiny/0).atanh() = new Complex(Inf, +Inf).atanh()
    const originalPath = new Complex(Infinity, -Infinity).atanh();
    const mutatedPath = new Complex(Infinity, Infinity).atanh();
    
    // Verify these two paths give different results
    const sameRe = Object.is(originalPath.re, mutatedPath.re);
    const sameIm = Object.is(originalPath.im, mutatedPath.im);
    
    const c = new Complex(tiny, tiny);
    const result = c.acoth();
    
    // The result should match the original path
    expect(Object.is(result.re, originalPath.re)).toBe(true);
    expect(Object.is(result.im, originalPath.im)).toBe(true);
    // And should NOT match the mutated path (if they differ)
    expect(sameRe && sameIm).toBe(false); // ensure paths are distinguishable
  });
});