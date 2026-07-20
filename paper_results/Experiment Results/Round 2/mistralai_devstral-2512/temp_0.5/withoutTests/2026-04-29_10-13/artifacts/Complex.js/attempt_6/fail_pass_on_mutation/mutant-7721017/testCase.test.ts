import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle zero base with positive real exponent and zero imaginary exponent", () => {
    const base = new Complex(0, 0);
    const exponent = new Complex(4, 0);
    const result = base.pow(exponent);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});