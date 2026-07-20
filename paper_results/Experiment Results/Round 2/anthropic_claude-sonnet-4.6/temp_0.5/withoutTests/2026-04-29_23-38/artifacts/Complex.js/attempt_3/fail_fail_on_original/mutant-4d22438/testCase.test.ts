import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs large values", () => {
  it("abs of Complex(3000, 4000) matches the expected value from the hypot formula", () => {
    const c = new Complex(3000, 4000);
    const result = c.abs();
    // Original: hypot uses b = y/x = 4000/3000, result = 4000 * sqrt(1 + (4/3)^2) = 20000/3
    // Mutated: hypot uses b = y*x = 12000000, result ≈ 4.8e10
    expect(result).toBeCloseTo(20000 / 3, 3);
  });
});