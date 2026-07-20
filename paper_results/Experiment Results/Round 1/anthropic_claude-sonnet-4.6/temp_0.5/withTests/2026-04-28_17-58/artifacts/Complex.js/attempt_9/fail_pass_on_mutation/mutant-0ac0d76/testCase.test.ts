import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with negative base", () => {
  it("pow(-2, 0.5) should return imaginary result not NaN", () => {
    const result = new Complex(-2, 0).pow(new Complex(0.5, 0));
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(Math.sqrt(2), 5);
  });
});