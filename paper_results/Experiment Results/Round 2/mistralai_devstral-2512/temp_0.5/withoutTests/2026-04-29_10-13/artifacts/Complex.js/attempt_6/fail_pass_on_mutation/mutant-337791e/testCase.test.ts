import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.exp", () => {
  it("should return correct result for complex number with zero imaginary part", () => {
    const c = new Complex(0.5, 0);
    const result = c.exp();
    expect(result.re).toBeCloseTo(Math.sqrt(Math.E));
    expect(result.im).toBe(0);
  });
});