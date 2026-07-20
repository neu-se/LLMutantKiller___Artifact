import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("inverse of zero should have re equal to Infinity not NaN", () => {
    const result = new Complex(0, 0).inverse();
    // Use Object.is to distinguish Infinity from NaN
    expect(Object.is(result.re, NaN)).toBe(false);
    expect(Object.is(result.re, Infinity)).toBe(true);
  });
});