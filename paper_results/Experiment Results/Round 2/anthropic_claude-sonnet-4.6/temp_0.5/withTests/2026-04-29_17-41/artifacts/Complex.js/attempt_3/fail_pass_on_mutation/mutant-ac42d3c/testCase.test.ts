import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should return exactly positive zero (not negative zero) for real part of atan(0 - i)", () => {
    const result = new Complex(0, -1).atan();
    // Original returns new Complex(0, -Infinity) with re = 0 (positive zero)
    // Mutated falls through and computes -0.5 * t1['im'] where t1['im'] = 0, giving -0
    expect(Object.is(result.re, 0)).toBe(true);
    expect(Object.is(result.re, -0)).toBe(false);
  });
});