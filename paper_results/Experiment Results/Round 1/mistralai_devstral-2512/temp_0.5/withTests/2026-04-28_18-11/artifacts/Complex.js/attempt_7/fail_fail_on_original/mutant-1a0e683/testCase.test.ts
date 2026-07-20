import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should handle 0^(positive real with zero imaginary part) correctly", () => {
    const base = new Complex(0, 0);
    const exponent = new Complex(2, 0);
    const result = base.pow(exponent);
    expect(Object.is(result.re, 0)).toBe(true);
    expect(Object.is(result.im, 0)).toBe(true);
  });
});