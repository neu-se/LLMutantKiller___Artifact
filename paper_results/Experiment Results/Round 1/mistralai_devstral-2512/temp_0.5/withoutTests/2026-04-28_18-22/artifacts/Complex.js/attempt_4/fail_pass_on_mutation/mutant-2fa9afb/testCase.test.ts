import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should compute sinh correctly for non-zero complex numbers", () => {
    const c = new Complex(1, 1);
    const result = c.sinh();
    const expectedRe = Math.sinh(1) * Math.cos(1);
    const expectedIm = Math.cosh(1) * Math.sin(1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});