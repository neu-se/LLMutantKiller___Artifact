import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should return Complex.ZERO when base is 0 and exponent is 0 with positive real part and zero imaginary part", () => {
    const result = new Complex(0, 0).pow(0, 0);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});