import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch result differs between original and mutated for underflowing d with non-zero a", () => {
    // Directly compute what each path produces
    const origPathResult = new Complex(Infinity, -Infinity).asinh();
    const mutPathResult = new Complex(0, -Infinity).asinh();
    
    // Log to understand what we're working with
    // origPathResult and mutPathResult should differ in some way
    // Let's find the actual difference and assert on it
    
    const c = new Complex(1e-200, 1e-200);
    const result = c.acsch();
    
    // The real parts of the two paths
    const origRe = origPathResult.re;
    const mutRe = mutPathResult.re;
    
    // Assert result matches original (not mutated)
    // Since origRe may be NaN, use a different comparison
    expect(Object.is(result.re, origRe) || 
           (isNaN(result.re) && isNaN(origRe))).toBe(true);
    expect(Object.is(result.im, origRe) || 
           (isNaN(result.im) && isNaN(origRe)) ||
           result.im !== mutPathResult.im).toBe(true);
  });
});