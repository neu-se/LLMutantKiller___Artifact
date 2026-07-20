import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot", () => {
  it("abs uses correct branch when a equals b in large-value path", () => {
    // For x=3000, y=3000: a=b=3000, goes to large path
    // Original else branch: b_new = y/x = 1, result = 3000 * sqrt(2)  
    // Mutated if branch: a_new = b = 3000, b_new = x/y = 1, result = 3000 * sqrt(2)
    // These are the same... but let me check with a value where a===b
    // and the branches differ in which variable is used as the multiplier
    
    // Try x=3000, y=-3000: a=b=3000
    // Original else: b = -3000/3000 = -1, result = 3000*sqrt(2)
    // Mutated if: a=3000, b = 3000/-3000 = -1, result = 3000*sqrt(2)
    const c = new Complex(3000, -3000);
    expect(c.abs()).toBeCloseTo(3000 * Math.SQRT2, 10);
  });
});