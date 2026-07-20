import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should return Complex.ZERO when raising zero to a positive real exponent with zero imaginary part", () => {
    const result = new Complex(0, 0).pow(2, 0);
    expect(result.equals(Complex.ZERO)).toBe(true);
  });
});