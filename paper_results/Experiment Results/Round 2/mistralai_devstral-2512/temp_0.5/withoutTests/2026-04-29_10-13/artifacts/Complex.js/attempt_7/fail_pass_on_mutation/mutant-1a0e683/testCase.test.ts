import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should return Complex.ONE when raising zero to zero exponent", () => {
    const result = new Complex(0, 0).pow(0, 0);
    expect(result.equals(Complex.ONE)).toBe(true);
  });
});