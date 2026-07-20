import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow()", () => {
  it("should return Complex.ZERO when raising zero to positive real exponent with zero imaginary", () => {
    const result = new Complex(0, 0).pow(3, 0);
    expect(result.equals(Complex.ZERO)).toBe(true);
  });
});