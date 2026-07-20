import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot with large equal absolute values", () => {
  it("should correctly compute abs() when both components have equal large magnitudes", () => {
    // Use values > 3000 so the overflow-safe hypot path is taken
    // When re = 4000 and im = -4000, |re| === |im| === 4000
    // Original: a < b is false (4000 < 4000 is false), so b = y/x = -4000/4000 = -1
    //   result = 4000 * sqrt(1 + 1) = 4000 * sqrt(2)
    // Mutated: a <= b is true (4000 <= 4000 is true), so a = b = 4000, b = x/y = 4000/-4000 = -1
    //   result = 4000 * sqrt(1 + 1) = 4000 * sqrt(2)
    // Same result... need different approach
    
    // Actually test with re=5000, im=3001 where |re| > |im|
    // Original: a=5000, b=3001, a < b is false, so b = im/re = 3001/5000
    //   result = 5000 * sqrt(1 + (3001/5000)^2)
    // Mutated: same since a != b
    
    // The mutation only differs when a === b exactly
    // Let's use re=4000, im=4000 (same sign)
    const c = new Complex(4000, 4000);
    const expected = 4000 * Math.sqrt(2);
    expect(c.abs()).toBeCloseTo(expected, 10);
  });
});