import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN handling", () => {
  it("should create a complex number from NaN input without throwing", () => {
    expect(() => new Complex(NaN)).not.toThrow();
    const c = new Complex(NaN);
    expect(isNaN(c.re)).toBe(true);
  });
});