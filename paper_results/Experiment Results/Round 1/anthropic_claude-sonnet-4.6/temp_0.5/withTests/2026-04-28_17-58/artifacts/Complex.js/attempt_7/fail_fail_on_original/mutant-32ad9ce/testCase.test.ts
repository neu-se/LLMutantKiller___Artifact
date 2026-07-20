import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN parse mutation", () => {
  it("should parse NaN+2i string where only real part is NaN", () => {
    const c = new Complex('NaN+2i');
    expect(isNaN(c.re)).toBe(true);
    expect(c.im).toBe(2);
  });
});