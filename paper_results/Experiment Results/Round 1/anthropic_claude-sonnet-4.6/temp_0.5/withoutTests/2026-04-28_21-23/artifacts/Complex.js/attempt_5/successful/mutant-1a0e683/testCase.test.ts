import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should return zero when 0+0i is raised to the power of 0.5+0i", () => {
    // Use exponent 0.5 (not integer) to bypass the integer-specific optimizations
    // but still hit the a===0 && b===0 && z.re>0 && z.im===0 condition
    // Original: z.im >= 0 is true, returns Complex.ZERO
    // Mutated: z.im > 0 is false (z.im===0), falls through to general path
    // General path: logHypot(0,0) = -Infinity, then NaN computation
    const base = new Complex(0, 0);
    const result = base.pow(new Complex(0.5, 0));
    
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});