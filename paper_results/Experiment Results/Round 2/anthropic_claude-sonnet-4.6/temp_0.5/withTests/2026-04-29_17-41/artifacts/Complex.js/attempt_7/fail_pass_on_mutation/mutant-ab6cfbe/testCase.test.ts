import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("(0)^2 should follow imaginary base path giving negative zero real part", () => {
    const result = new Complex(0, 0).pow(2);
    expect(Object.is(result.re, -0)).toBe(true);
    expect(result.im).toBe(0);
  });
});