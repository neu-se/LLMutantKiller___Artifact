import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot large values", () => {
  it("abs() returns correct value for large complex number where |re| > |im|, both >= 3000", () => {
    // For new Complex(4000, 3000).abs():
    // hypot(4000, 3000): a=4000, b=3000, a>=b
    // Original (a=b then b=x/y): a becomes 3000, b=4000/3000=4/3
    //   result = 3000 * sqrt(1 + 16/9) = 3000 * 5/3 = 5000
    // Mutated (b=x*y then b=x/y): a stays 4000, b=4000/3000=4/3
    //   result = 4000 * sqrt(1 + 16/9) = 4000 * 5/3 ≈ 6666.67
    // Expected: sqrt(4000^2 + 3000^2) = 5000
    const c = new Complex(4000, 3000);
    expect(c.abs()).toBeCloseTo(5000, 3);
  });
});