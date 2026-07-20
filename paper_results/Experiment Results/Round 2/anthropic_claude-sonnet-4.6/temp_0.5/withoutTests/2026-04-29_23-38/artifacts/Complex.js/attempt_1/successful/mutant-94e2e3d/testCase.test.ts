import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow mutation test", () => {
  it("should correctly compute 0^(0+i) - base zero with purely imaginary exponent", () => {
    // When base is 0+0i and exponent has re=0, im=1:
    // Original: z['re'] > 0 is false (0 is not > 0), so falls through to general computation
    // Mutated: z['re'] >= 0 is true (0 >= 0), so returns ZERO
    const base = new Complex(0, 0);
    const result = base.pow(new Complex(0, 1));
    
    // Original code falls through to logHypot(0,0) = -Infinity path, result should be NaN
    // Mutated code returns ZERO
    expect(result.isNaN()).toBe(true);
  });
});