import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication short circuit for real numbers", () => {
  it("should return positive zero imaginary part when multiplying two negative real numbers", () => {
    const a = new Complex(-3, 0);
    const b = new Complex(-4, 0);
    const result = a.mul(b);
    // With short circuit: new Complex((-3)*(-4), 0) = Complex(12, 0), im is +0
    // With general formula: re = (-3)*(-4) - 0*0 = 12, im = (-3)*0 + 0*(-4) = 0
    // Both give same result, need different approach
    expect(result.re).toBe(12);
    expect(Object.is(result.im, 0)).toBe(true);
    expect(Object.is(result.im, -0)).toBe(false);
  });
});