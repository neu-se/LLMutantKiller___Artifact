import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() with large numbers triggering hypot large-number branch", () => {
  it("should correctly compute abs for complex number where both components exceed 3000", () => {
    // Both 4000 and 3000 are >= 3000, triggering the large-number branch
    // Expected: sqrt(4000^2 + 3000^2) = sqrt(16000000 + 9000000) = sqrt(25000000) = 5000
    // With mutation b = x * y = 4000 * 3000 = 12000000, result would be 4000 * sqrt(1 + 144e12) ≈ 4.8e9
    const z = new Complex(4000, 3000);
    const result = z.abs();
    expect(result).toBe(5000);
  });
});