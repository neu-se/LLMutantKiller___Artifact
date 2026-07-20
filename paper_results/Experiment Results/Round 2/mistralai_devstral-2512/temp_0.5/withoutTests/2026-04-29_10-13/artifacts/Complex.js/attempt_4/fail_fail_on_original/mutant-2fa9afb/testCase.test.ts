import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should correctly handle non-zero inputs and not return NaN", () => {
    const result = new Complex(2, 3).sinh();
    expect(result.re).toBeCloseTo(3.590584, 6);
    expect(result.im).toBeCloseTo(0.530921, 6);
  });
});