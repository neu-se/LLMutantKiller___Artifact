import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should compute cosh correctly for pure imaginary numbers", () => {
    const c = new Complex(0, 0.5);
    const result = c.cosh();
    const expectedRe = Math.cos(0.5);
    const expectedIm = Math.sin(0.5);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});