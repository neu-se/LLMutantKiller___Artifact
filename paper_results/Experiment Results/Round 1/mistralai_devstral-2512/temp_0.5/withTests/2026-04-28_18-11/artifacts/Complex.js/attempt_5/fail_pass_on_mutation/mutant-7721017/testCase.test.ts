import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should return Complex.ZERO when base is 0 and exponent is positive real", () => {
    const result = new Complex(0, 0).pow(2, 0);
    expect(result.equals(Complex.ZERO)).toBe(true);
  });
});