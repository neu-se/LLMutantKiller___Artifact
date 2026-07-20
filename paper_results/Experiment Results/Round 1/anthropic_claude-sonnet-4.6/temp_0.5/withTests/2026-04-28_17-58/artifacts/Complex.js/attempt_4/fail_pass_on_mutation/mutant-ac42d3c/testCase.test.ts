import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan of (0, -1)", () => {
  it("should have re === 0 (positive zero, not negative zero)", () => {
    const result = new Complex(0, -1).atan();
    // Original returns new Complex(0, -Infinity) where re is +0
    // Mutated computes -0.5 * t1.im where t1.im = 0, giving -0
    expect(Object.is(result.re, 0)).toBe(true);
    expect(Object.is(result.re, -0)).toBe(false);
  });
});