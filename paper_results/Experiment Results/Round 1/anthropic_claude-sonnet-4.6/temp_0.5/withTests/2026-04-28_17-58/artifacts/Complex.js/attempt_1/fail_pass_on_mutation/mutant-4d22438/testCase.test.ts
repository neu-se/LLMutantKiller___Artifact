import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() with large values", () => {
  it("should correctly compute the absolute value of a complex number with large components", () => {
    // Use values >= 3000 where |re| < |im| to trigger the mutated branch
    // hypot(3000, 4000) should equal 5000 (3-4-5 triangle scaled by 1000)
    const c = new Complex(3000, 4000);
    const result = c.abs();
    expect(result).toBeCloseTo(5000, 5);
  });
});