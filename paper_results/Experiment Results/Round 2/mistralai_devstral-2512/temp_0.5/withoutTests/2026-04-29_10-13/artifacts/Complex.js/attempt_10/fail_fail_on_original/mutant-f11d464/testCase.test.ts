import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle purely imaginary base with exponent 2.5", () => {
    const result = new Complex(0, 4).pow(2.5);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(32);
  });
});