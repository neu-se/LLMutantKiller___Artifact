import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow()", () => {
  it("should handle zero base with positive real exponent and zero imaginary exponent", () => {
    const result = new Complex(0, 0).pow(0, 0);
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBeCloseTo(0);
  });
});