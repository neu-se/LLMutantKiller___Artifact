import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should not mutate the original complex number's re property when computing asinh", () => {
    const c = new Complex(2, 3);
    const originalRe = c.re;
    c.asinh();
    // After asinh(), the original object should have its re restored
    // In the mutated code, this['re'] = -this[""] = NaN, so c.re becomes NaN
    expect(isNaN(c.re)).toBe(false);
    expect(c.re).toBe(originalRe);
  });
});