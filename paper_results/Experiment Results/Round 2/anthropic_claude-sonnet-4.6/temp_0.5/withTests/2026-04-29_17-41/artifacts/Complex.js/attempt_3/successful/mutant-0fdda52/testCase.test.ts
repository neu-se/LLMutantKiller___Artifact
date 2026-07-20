import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs overflow detection", () => {
  it("should return finite result for very large real with small imaginary", () => {
    const c = new Complex(1e200, 3001);
    const result = c.abs();
    expect(isFinite(result)).toBe(true);
    expect(result).toBe(1e200);
  });
});