import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("atan of complex number near negative i should not be NaN", () => {
    // Test with a=0, b=-1 specifically checking NaN behavior
    const result = new Complex(0, -1).atan();
    expect(result.isNaN()).toBe(false);
    expect(isFinite(result.re)).toBe(true);
    expect(result.re).toBe(0);
  });
});