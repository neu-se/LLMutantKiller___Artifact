import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.pow", () => {
  it("should handle zero base with positive real exponent correctly", () => {
    const base = new Complex(0, 0);
    const exponent = new Complex(2, 3);
    const result = base.pow(exponent);
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});