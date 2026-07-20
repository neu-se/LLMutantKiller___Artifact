import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex array input with partial NaN", () => {
  it("should handle array input where only first element is NaN", () => {
    const c = new Complex([NaN, 5]);
    expect(isNaN(c.re)).toBe(true);
    expect(c.im).toBe(5);
  });
});