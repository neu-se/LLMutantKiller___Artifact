import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan with b === -1", () => {
  it("should return Complex with re === 0 (positive zero) when atan is called on Complex(0, -1)", () => {
    const c = new Complex(0, -1);
    const result = c.atan();
    expect(result.im).toBe(-Infinity);
    // Original returns new Complex(0, -Infinity) where re is +0
    // Mutated falls through and computes re = -0.5 * t1['im'] = -0.5 * 0 = -0
    expect(Object.is(result.re, 0)).toBe(true); // +0, not -0
  });
});