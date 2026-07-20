import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle purely imaginary base with fractional exponent", () => {
    const result = new Complex(0, 4).pow(0.5);
    expect(result.re).toBeCloseTo(Math.sqrt(2));
    expect(result.im).toBeCloseTo(Math.sqrt(2));
  });
});