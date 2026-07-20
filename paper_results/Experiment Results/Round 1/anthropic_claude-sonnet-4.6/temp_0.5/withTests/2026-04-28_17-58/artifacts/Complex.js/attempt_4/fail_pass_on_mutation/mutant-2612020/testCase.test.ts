import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a string with only imaginary part having no real component", () => {
    const c = new Complex("i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
    expect(c.isZero()).toBe(false);
    expect(c.abs()).toBeCloseTo(1);
  });
});