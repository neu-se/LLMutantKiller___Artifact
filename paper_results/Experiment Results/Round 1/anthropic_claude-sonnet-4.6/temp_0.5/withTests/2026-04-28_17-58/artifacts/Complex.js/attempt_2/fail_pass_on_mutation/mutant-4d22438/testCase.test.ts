import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() large values hypot branch", () => {
  it("should return correct magnitude for large complex number triggering the hypot large-value branch", () => {
    // x=3000, y=4000: both >= 3000, |x| < |y|
    // Original: b = y/x = 4000/3000, result = 4000 * sqrt(1 + (4/3)^2) = 5000
    // Mutated:  b = y*x = 4000*3000 = 12000000, result = 4000 * sqrt(1 + 144e12) ≈ 4.8e8
    const c = new Complex(3000, 4000);
    const magnitude = c.abs();
    expect(magnitude).toBeGreaterThan(4999);
    expect(magnitude).toBeLessThan(5001);
  });
});