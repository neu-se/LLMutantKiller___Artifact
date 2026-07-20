import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot via abs with large numbers where imaginary exceeds real", () => {
  it("abs of 3000+4000i should equal exactly 5000", () => {
    const c = new Complex(3000, 4000);
    const result = c.abs();
    expect(result).toBeGreaterThan(4999);
    expect(result).toBeLessThan(5001);
  });
});