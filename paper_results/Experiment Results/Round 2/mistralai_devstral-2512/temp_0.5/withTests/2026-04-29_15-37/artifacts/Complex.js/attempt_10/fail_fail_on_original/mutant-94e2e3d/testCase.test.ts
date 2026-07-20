import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow() with zero base", () => {
  it("should return Complex.ONE when raising zero to a positive real exponent", () => {
    const zero = new Complex(0, 0);
    const exponent = new Complex(0, -0.1); // Small negative imaginary exponent
    const result = zero.pow(exponent);
    expect(result.equals(Complex.ONE)).toBe(true);
  });
});