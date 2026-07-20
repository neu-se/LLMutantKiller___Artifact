import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should handle 0^0 with zero imaginary part in exponent", () => {
    const base = new Complex(0, 0);
    const exponent = new Complex(0, 0);
    const result = base.pow(exponent);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});