import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh edge case", () => {
  it("atanh of zero should not be NaN", () => {
    const c = new Complex(0, 0);
    const result = c.atanh();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});