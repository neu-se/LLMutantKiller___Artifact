import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute secant for a complex number with non-zero imaginary part", () => {
    const c = new Complex(1, 1);
    const result = c.sec();
    const expectedRe = 0.5 * (Math.cos(2) + Math.cosh(2)) / (Math.cos(1) * Math.cosh(1));
    const expectedIm = -0.5 * (Math.sin(2) + Math.sinh(2)) / (Math.cos(1) * Math.cosh(1));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});