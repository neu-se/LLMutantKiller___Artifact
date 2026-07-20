import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should return correct result for non-zero input", () => {
    const result = new Complex(1, 0).sinh();
    expect(result.re).toBeCloseTo(Math.sinh(1), 10);
    expect(result.im).toBe(0);
  });
});