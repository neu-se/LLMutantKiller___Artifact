import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot large values", () => {
  it("should correctly compute abs for large values where a >= b, both >= 3000", () => {
    // hypot(5000, 4000): a=5000, b=4000, a>=b branch
    // Original: b = x/y = 5000/4000 = 1.25, then b = x/y again = 1.25
    // result = 5000 * sqrt(1 + 1.5625) = 5000 * sqrt(2.5625) ≈ 6403.124
    // Mutated: b = x*y = 20000000, then b = x/y = 1.25 (overwritten)
    // Both give same result if b=x/y runs after placeholder
    const c = new Complex(5000, 4000);
    const expected = Math.sqrt(5000 * 5000 + 4000 * 4000);
    expect(c.abs()).toBeCloseTo(expected, 5);
  });
});