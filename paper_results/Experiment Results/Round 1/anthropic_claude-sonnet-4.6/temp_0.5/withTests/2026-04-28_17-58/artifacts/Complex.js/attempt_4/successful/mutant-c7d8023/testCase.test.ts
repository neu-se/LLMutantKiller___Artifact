import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch of tiny imaginary should not return zero", () => {
    const result = new Complex(0, Number.MIN_VALUE).acsch();
    // Original: NaN (not zero)
    // Mutated: 0 or -0 (zero) when underflow occurs
    // Both: same finite value when no underflow
    
    // If underflow: original=NaN, mutated=0
    // If no underflow: original=finite, mutated=finite (same)
    
    // We want: test passes on original, fails on mutated
    // This only works if underflow happens
    
    // Check: result is NaN (original with underflow)
    // OR result is the same as the no-underflow case (both)
    
    // Actually, let's just check it's not zero
    expect(result.re === 0).toBe(false); // NaN === 0 is false, so passes for NaN
    // But if no underflow, result.re might be some finite value ≠ 0, still passes
    // Mutated with underflow: result.re = -0, -0 === 0 is true, fails ✓
  });
});