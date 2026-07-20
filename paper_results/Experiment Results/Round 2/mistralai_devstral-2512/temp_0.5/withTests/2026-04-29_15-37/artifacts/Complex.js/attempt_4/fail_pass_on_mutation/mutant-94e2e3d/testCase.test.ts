import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow() with zero base", () => {
  it("should return Complex.ZERO when raising zero to a positive exponent", () => {
    const zero = new Complex(0, 0);
    const exponent = new Complex(2, 0);
    const result = zero.pow(exponent);
    expect(result.equals(Complex.ZERO)).toBe(true);
  });
});