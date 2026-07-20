import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("atan(0 - i) real part should be positive zero not negative zero", () => {
    const result = new Complex(0, -1).atan();
    // Original: re = 0 (positive zero), so 1/re = +Infinity
    // Mutated: re = -0 (negative zero), so 1/re = -Infinity
    expect(1 / result.re).toBe(Infinity);
  });
});