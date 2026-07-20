import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle purely imaginary base with exponent 4", () => {
    const result = new Complex(0, 2).pow(4);
    expect(result.re).toBeCloseTo(16);
    expect(result.im).toBeCloseTo(0);
  });
});