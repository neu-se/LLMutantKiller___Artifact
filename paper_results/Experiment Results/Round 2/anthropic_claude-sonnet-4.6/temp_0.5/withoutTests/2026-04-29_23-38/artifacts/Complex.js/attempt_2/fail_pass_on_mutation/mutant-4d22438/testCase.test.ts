import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot large value branch", () => {
  it("abs of complex number with large components should be finite and reasonable", () => {
    // hypot(3000, 4000) with a < b branch:
    // original: b = y/x, result is finite and < 10000
    // mutated: b = y*x = 12000000, result is ~48 billion
    const c = new Complex(3000, 4000);
    const result = c.abs();
    expect(result).toBeLessThan(10000);
    expect(result).toBeGreaterThan(4000);
  });
});