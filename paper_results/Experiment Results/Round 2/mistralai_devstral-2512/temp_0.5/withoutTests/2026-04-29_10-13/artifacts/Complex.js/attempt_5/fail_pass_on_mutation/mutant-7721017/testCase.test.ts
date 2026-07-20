import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle non-zero base with zero imaginary part and positive real exponent", () => {
    const base = new Complex(1, 0);
    const exponent = new Complex(2, 0);
    const result = base.pow(exponent);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});