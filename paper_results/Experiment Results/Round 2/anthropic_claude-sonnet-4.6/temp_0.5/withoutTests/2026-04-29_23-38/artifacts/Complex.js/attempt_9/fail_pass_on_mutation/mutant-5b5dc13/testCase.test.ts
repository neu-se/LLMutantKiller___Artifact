import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch for purely imaginary tiny number: original gives non-NaN re, mutated gives NaN re", () => {
    // a=0, b=1e-200: d = 0 + (1e-200)^2 underflows to 0, b!==0 skips early return
    // Original: (a !== 0) ? a/0 : 0 => (0 !== 0) => 0  => new Complex(0, -Infinity).asinh()
    // Mutated:  (a === 0) ? a/0 : 0 => (0 === 0)  => 0/0=NaN => new Complex(NaN, -Infinity).asinh()
    const originalPath = new Complex(0, -Infinity).asinh();
    const mutatedPath = new Complex(NaN, -Infinity).asinh();
    
    // Verify paths differ
    const pathsDiffer = isNaN(originalPath.re) !== isNaN(mutatedPath.re) ||
                        isNaN(originalPath.im) !== isNaN(mutatedPath.im) ||
                        originalPath.re !== mutatedPath.re ||
                        originalPath.im !== mutatedPath.im;
    
    expect(pathsDiffer).toBe(true); // sanity check
    
    const c = new Complex(0, 1e-200);
    const result = c.acsch();
    
    // Original path result
    expect(isNaN(result.re)).toBe(isNaN(originalPath.re));
    expect(isNaN(result.im)).toBe(isNaN(originalPath.im));
  });
});