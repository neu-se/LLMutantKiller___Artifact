import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot large equal values', () => {
  it('computes abs correctly when both components equal exactly 3000', () => {
    // a=3000, b=3000: first condition is (3000 < 3000 && 3000 <= 3000) = false
    // Goes to large path. a===b.
    // Original (a < b = false): b = y/x = 3000/3000 = 1, result = 3000*sqrt(2)
    // Mutated (a <= b = true): a = b = 3000, b = x/y = 3000/3000 = 1, result = 3000*sqrt(2)
    // Same... 
    const c = new Complex(3000, 3000);
    expect(c.abs()).toBe(Math.sqrt(3000*3000 + 3000*3000));
  });
});