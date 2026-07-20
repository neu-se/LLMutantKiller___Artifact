import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should compute (0+0i)^(0.5+0i) correctly - zero base with non-negative real exponent", () => {
    // Original: a===0, b===0, z.re=0.5 > 0, z.im=0 >= 0 => returns ZERO
    // But with z.im = 1 (positive imaginary exponent): original still returns ZERO
    // Test with z.re = 0.5, z.im = -1: original condition z.im >= 0 is FALSE, so does NOT return ZERO
    // Mutated: if(true) always returns ZERO
    const zero = new Complex(0, 0);
    const result = zero.pow(new Complex(0.5, -1));
    
    // Original should NOT return ZERO (z.im = -1 < 0 fails the condition)
    expect(result.re).not.toBe(0);
  });
});