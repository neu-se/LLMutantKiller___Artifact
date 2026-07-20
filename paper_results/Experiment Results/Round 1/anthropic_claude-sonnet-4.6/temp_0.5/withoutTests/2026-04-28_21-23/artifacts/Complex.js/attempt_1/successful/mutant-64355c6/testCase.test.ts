import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return a finite result for a non-zero real number, not Infinity", () => {
    // The mutation changes `if (a === 0 && b === 0)` to `if (a === 0 && true)`
    // This means any complex number with re=0 will return Complex['INFINITY']
    // even when b !== 0.
    // We test asec(2) which has a=2, b=0 - this should NOT trigger the infinity branch.
    // With the mutation: a===0 is false, so the condition is false - this case is fine.
    // We need a case where a=0 but b!=0, e.g. asec(0+2i)
    // Original: a===0 && b===0 => false (since b=2), so proceeds normally
    // Mutated: a===0 && true => true, returns Infinity incorrectly
    
    const result = new Complex(0, 2).asec();
    
    // asec(2i) should be a finite complex number, not Infinity
    expect(result.isInfinite()).toBe(false);
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});