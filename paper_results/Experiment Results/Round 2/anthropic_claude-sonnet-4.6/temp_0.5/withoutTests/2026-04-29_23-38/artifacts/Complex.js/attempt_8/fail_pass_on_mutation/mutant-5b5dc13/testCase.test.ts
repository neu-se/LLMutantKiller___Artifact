import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch for tiny complex number matches expected value from original code path", () => {
    // For a=1e-200, b=1e-200: d = a^2 + b^2 underflows to 0
    // b !== 0 so early return is skipped
    // Original: (a !== 0) ? a/0 : 0 = Infinity  => new Complex(Infinity, -Infinity).asinh()
    // Mutated:  (a === 0) ? a/0 : 0 = 0          => new Complex(0, -Infinity).asinh()
    
    // Compute both paths explicitly
    const originalPath = new Complex(Infinity, -Infinity).asinh();
    const mutatedPath = new Complex(0, -Infinity).asinh();
    
    // They must differ for this test to be meaningful
    // originalPath.re should be NaN (Infinity-Infinity in asin computation)
    // mutatedPath.re should be -pi/2 (asin of pure imaginary infinity)
    
    const c = new Complex(1e-200, 1e-200);
    const result = c.acsch();
    
    // On original code: result.re === originalPath.re (both NaN)
    // On mutated code: result.re === mutatedPath.re (finite value)
    expect(isNaN(result.re)).toBe(isNaN(originalPath.re));
  });
});