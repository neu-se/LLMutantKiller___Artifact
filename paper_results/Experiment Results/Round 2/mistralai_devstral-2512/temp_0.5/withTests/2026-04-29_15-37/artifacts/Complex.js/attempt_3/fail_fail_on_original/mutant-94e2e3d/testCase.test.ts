import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow() with zero base", () => {
  it("should return Complex.NAN when raising zero to zero", () => {
    const zero = new Complex(0, 0);
    const exponent = new Complex(0, 0);
    const result = zero.pow(exponent);
    expect(result.isNaN()).toBe(true);
  });
});