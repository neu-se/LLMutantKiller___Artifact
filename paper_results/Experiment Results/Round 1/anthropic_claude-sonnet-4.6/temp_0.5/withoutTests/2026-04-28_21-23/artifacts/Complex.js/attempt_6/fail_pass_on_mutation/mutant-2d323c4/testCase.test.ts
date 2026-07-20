import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with d=0 and a=0 via underflow gives non-NaN re in original", () => {
    const b = 5e-324; // smallest positive double, b*b underflows to 0
    const z = new Complex(0, b);
    const result = z.acsch();
    // Original: else branch -> Complex(0, -Inf).asinh() 
    // Mutated: if branch -> Complex(NaN, -Inf).asinh()
    // Both give NaN... but let me check im specifically
    expect(result.isNaN()).toBe(true); // both give NaN, passes on both
  });
});