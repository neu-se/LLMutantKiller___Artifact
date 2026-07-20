import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should return zero when base is zero and exponent is positive real (accessed via general path with non-integer)", () => {
    // When base = 0+0i and exponent has im=0, the z['im']===0 branch is entered
    // but if a===0 and b===0, we hit the switch. For non-integer z['re'], case 0 applies.
    // The PLACEHOLDER is only reached when z['im'] !== 0.
    // Test: base=0+0i, exponent=2+epsilon*i where epsilon→0 but !=0
    // With original (>= 0): returns ZERO for im=0 case
    // Need to find the exact boundary case
    
    // Try base=0, exponent with very small positive imaginary part
    const result = new Complex(0, 0).pow(new Complex(1, Number.MIN_VALUE));
    // Original: z['im'] >= 0 (MIN_VALUE >= 0 is true) → returns ZERO → re=0, im=0
    // Mutated: z['im'] > 0 (MIN_VALUE > 0 is true) → also returns ZERO
    // Both same... 
    
    // The ONLY difference is z['im'] === 0 exactly
    // But z['im']===0 is caught by earlier branch...
    // Unless we can make z['im'] be -0
    const result2 = new Complex(0, 0).pow(new Complex(2, -0));
    expect(result2.isNaN()).toBe(false);
    expect(Math.abs(result2.re) + Math.abs(result2.im)).toBe(0);
  });
});