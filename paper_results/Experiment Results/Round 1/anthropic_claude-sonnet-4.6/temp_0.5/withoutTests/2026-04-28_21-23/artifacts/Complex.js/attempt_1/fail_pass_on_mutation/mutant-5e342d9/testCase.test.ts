import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() with large numbers", () => {
  it("should correctly compute the absolute value of a complex number with large components", () => {
    // Use values >= 3000 to trigger the large-number branch in hypot
    // For z = 4000 + 3000i, |z| = sqrt(4000^2 + 3000^2) = sqrt(16000000 + 9000000) = sqrt(25000000) = 5000
    const z = new Complex(4000, 3000);
    const result = z.abs();
    expect(result).toBeCloseTo(5000, 5);
  });
});