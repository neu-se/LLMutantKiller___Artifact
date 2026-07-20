import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("acsch with subnormal input triggers else branch with different results", () => {
    // Use 1e-200: definitely non-zero, but (1e-200)^2 = 1e-400 which underflows to 0
    const v = 1e-200;
    
    // If v*v = 0, else branch is taken:
    // Original: new Complex(0, -Infinity).asinh() -> NaN
    // Mutated:  new Complex(0, 0).asinh() -> Complex(0, 0)
    // 
    // If v*v != 0, normal branch is taken and both give same result
    
    const c = new Complex(v, v);
    const result = c.acsch();
    
    // On original: NaN (from else branch) or some value (from normal branch)
    // On mutated: Complex(0,0) (from else branch) or same value as original (from normal branch)
    // 
    // The key: if else branch is taken, original gives NaN and mutated gives 0
    // We need to verify else branch IS taken
    
    // Verify v*v = 0 (else branch condition)
    const d = v * v + v * v;
    expect(d).toBe(0);  // This should pass if underflow occurs
    
    // Now test acsch
    expect(isNaN(result.re)).toBe(true);
  });
});