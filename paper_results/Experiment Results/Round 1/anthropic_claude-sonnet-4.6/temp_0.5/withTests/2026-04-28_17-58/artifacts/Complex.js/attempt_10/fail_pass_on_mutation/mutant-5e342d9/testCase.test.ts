import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs large value", () => {
  it("detects mutation in hypot large-value a>=b branch by checking ratio", () => {
    // hypot(6000, 3000): a=6000 >= b=3000
    // Original (a=b=3000, b=x/y=2): return 3000*sqrt(5) ≈ 6708.2
    // Mutated (b=x*y dead, b=x/y=2): a=6000, return 6000*sqrt(5) ≈ 13416.4
    // Correct: sqrt(36000000+9000000) = sqrt(45000000) = 3000*sqrt(5) ≈ 6708.2
    // Ratio between mutated and correct = 6000/3000 = 2
    const large = new Complex(6000, 3000);
    const absLarge = large.abs();
    
    // Compare with small-value path (below 3000 threshold) scaled up
    const small = new Complex(60, 30);
    const absSmall = small.abs();
    
    // Should be proportional by 100x
    expect(absLarge / absSmall).toBeCloseTo(100, 5);
  });
});