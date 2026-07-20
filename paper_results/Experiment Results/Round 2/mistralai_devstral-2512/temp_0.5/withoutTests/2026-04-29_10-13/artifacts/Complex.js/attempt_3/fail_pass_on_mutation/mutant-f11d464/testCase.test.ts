import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle purely imaginary base with exponent 2", () => {
    const result = new Complex(0, 3).pow(2);
    expect(result.re).toBeCloseTo(-9);
    expect(result.im).toBeCloseTo(0);
  });
});