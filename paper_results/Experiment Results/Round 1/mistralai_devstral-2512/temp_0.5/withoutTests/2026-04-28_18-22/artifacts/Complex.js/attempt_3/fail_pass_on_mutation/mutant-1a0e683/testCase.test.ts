import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow()", () => {
  it("should return 1 when raising zero to zero exponent with positive real and zero imaginary", () => {
    const result = new Complex(0, 0).pow(0, 0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});