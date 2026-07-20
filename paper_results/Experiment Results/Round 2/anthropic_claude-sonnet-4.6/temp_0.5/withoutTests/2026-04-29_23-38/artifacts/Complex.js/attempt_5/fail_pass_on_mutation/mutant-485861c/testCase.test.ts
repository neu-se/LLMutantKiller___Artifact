import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null handling", () => {
  it("should set im to 0 when input is null, not leave it as undefined", () => {
    const c = new Complex(null);
    // If mutation causes z['im'] to not be set, it would be undefined (not 0)
    // which would make isNaN return true
    expect(c.isNaN()).toBe(false);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(c.isZero()).toBe(true);
  });
});