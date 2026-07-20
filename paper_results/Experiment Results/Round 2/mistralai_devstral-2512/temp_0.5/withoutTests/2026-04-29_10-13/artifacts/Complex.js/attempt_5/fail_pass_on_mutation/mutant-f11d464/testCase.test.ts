import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should correctly handle purely imaginary base with negative exponent", () => {
    const result = new Complex(0, 2).pow(-1);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-0.5);
  });
});