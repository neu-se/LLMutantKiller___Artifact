import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle non-zero base with positive real exponent when base has non-zero imaginary part", () => {
    const base = new Complex(1, 1);
    const exponent = new Complex(2, 0);
    const result = base.pow(exponent);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(2);
  });
});