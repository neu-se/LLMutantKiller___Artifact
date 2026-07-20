import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot large value branch", () => {
  it("abs() gives correct result when both re and im are >= 3000 and re > im", () => {
    // Force the large-value branch: both components must be >= 3000
    // Use re=5000, im=3000 so a(=5000) >= b(=3000)
    // Original (a=b; b=x/y): a=3000, b=5000/3000, return 3000*sqrt(1+(5/3)^2) = sqrt(34M) ≈ 5831
    // Mutated (b=x*y; b=x/y): a=5000, b=5/3, return 5000*sqrt(1+(5/3)^2) ≈ 9718
    // Correct answer: sqrt(5000^2 + 3000^2) = sqrt(34000000) ≈ 5830.95
    const c = new Complex(5000, 3000);
    const correct = Math.sqrt(5000 * 5000 + 3000 * 3000);
    // Verify we're in the large-value branch (not small)
    expect(correct).toBeCloseTo(5830.95, 1);
    // This should pass on original, fail on mutated
    expect(c.abs()).toBeCloseTo(correct, 0);
  });
});