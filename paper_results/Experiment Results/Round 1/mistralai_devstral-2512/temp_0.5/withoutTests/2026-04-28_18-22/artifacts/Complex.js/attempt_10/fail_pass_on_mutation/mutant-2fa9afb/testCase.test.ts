import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should not execute special case logic for non-zero complex numbers", () => {
    const c = new Complex(1, 1);
    const result = c.sinh();
    // The mutation changes the condition to always true, which would incorrectly
    // execute the special case logic for all inputs
    // For non-zero inputs, this should use the standard sinh formula
    const expectedRe = Math.sinh(1) * Math.cos(1);
    const expectedIm = Math.cosh(1) * Math.sin(1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});