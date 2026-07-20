import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should return ZERO only when base is zero with positive real exponent, not for non-zero base", () => {
    // With original: (a===0 && b===0 && z.re > 0 && z.im >= 0) - only zero base returns ZERO
    // With mutation: if(true) always returns ZERO, but wait...
    // Actually test zero base with negative exponent - original won't return ZERO, mutated will
    const zero = new Complex(0, 0);
    const result = zero.pow(new Complex(-1, 0));
    
    // 0^(-1) = Infinity, not ZERO
    // Original: a===0, b===0, z.re=-1 which is NOT > 0, so doesn't return ZERO early
    // Mutated: if(true) returns ZERO
    expect(result.re).toBe(Infinity);
  });
});