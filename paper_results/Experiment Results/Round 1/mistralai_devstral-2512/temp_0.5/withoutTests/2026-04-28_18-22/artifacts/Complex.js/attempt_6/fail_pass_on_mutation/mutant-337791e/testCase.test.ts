import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.exp()", () => {
  it("should return correct result for complex number with non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.exp();
    const expectedRe = Math.exp(1) * Math.cos(1);
    const expectedIm = Math.exp(1) * Math.sin(1);
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});