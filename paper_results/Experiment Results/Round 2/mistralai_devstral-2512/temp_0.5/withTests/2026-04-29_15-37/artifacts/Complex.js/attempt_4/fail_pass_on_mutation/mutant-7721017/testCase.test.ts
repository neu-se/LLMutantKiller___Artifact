import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle zero base with positive real exponent and zero imaginary exponent", () => {
    const result = new Complex(0, 0).pow(5, 0);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});