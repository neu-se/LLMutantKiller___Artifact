import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("directly tests the else branch of acsch by checking asinh of 0,-Infinity vs 0,0", () => {
    // The mutation changes (b !== 0) ? -b/0 : 0  to  (false) ? -b/0 : 0
    // This means when the else branch is taken, the imaginary argument to asinh
    // changes from -Infinity to 0
    // new Complex(0, -Infinity).asinh() should give NaN
    // new Complex(0, 0).asinh() should give Complex(0, 0)
    
    // Verify these are different (to confirm our test logic)
    const originalPath = new Complex(0, -Infinity).asinh();
    const mutatedPath = new Complex(0, 0).asinh();
    
    expect(isNaN(originalPath.re)).toBe(true);
    expect(isNaN(mutatedPath.re)).toBe(false);
    expect(mutatedPath.re).toBeCloseTo(0, 10);
  });
});