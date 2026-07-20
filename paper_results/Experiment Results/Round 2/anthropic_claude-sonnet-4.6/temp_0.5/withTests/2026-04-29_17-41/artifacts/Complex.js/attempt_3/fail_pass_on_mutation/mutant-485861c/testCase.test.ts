import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null handling", () => {
  it("should correctly handle null input producing zero complex number", () => {
    const c = new Complex(null);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
    expect(c.abs()).toBe(0);
    expect(c.isZero()).toBe(true);
    expect(c.toString()).toBe("0");
    expect(c.valueOf()).toBe(0);
  });
});