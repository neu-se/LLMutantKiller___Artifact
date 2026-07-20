import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs", () => {
  it("abs for large values where a equals b", () => {
    // When a === b in the large-value path:
    // Original (a < b = false): else branch
    // Mutated (a <= b = true): if branch
    // For a = b = 3000: both give 3000 * sqrt(2)
    // Test with exact value known to be produced by original
    const c = new Complex(3000, 3000);
    expect(c.abs()).toBeCloseTo(3000 * Math.SQRT2, 10);
  });
});