import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex with null input chained assignment", () => {
  it("should set re to 0 when constructed with null", () => {
    const c = new Complex(null);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(isNaN(c.re)).toBe(false);
    expect(isNaN(c.im)).toBe(false);
  });
});