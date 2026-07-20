import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should return correct result for non-zero imaginary numbers", () => {
    const c = new Complex(0, 1);
    const result = c.sinh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.sin(1), 10);
  });
});