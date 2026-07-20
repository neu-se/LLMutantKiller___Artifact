import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should correctly handle non-zero complex numbers by not executing the special case", () => {
    const c = new Complex(0.1, 0.1);
    const result = c.sinh();
    // The mutation changes the condition from (a === 0 && b === 0) to always true
    // This would cause the special case logic to execute for all inputs
    // For non-zero inputs, this should use the standard sinh formula
    const expectedRe = Math.sinh(0.1) * Math.cos(0.1);
    const expectedIm = Math.cosh(0.1) * Math.sin(0.1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});