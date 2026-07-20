import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle non-zero base with positive real exponent when base has zero imaginary part", () => {
    const base = new Complex(2, 0);
    const exponent = new Complex(3, 0);
    const result = base.pow(exponent);
    expect(result.re).toBe(8);
    expect(result.im).toBe(0);
  });
});