import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should not execute special case logic for non-zero inputs", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sinh();
    // The mutation changes the condition to always true, which would incorrectly
    // execute the special case logic for all inputs
    // For non-zero inputs, this should compute the normal sinh formula
    const expectedRe = Math.sinh(0.5) * Math.cos(0.5);
    const expectedIm = Math.cosh(0.5) * Math.sin(0.5);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});