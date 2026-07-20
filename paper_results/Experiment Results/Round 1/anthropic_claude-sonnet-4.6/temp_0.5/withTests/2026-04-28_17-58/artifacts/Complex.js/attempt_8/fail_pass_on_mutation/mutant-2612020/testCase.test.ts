import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string with real number only and have im exactly 0", () => {
    const c = new Complex("42");
    expect(c.re).toBe(42);
    expect(c.im).toBe(0);
    expect(c.isZero()).toBe(false);
    expect(c.equals(42)).toBe(true);
  });
});