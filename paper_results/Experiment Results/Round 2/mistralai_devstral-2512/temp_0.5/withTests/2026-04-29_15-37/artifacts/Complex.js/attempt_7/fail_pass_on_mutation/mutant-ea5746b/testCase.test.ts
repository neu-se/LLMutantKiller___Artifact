import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation", () => {
  it("should correctly compute cos(x) - 1 for very small x values", () => {
    const x = 0.001;
    const c = new Complex(0, x);
    const result = c.expm1();
    // For very small x, the Taylor series approximation should be more accurate
    // The real part should be cos(x) - 1 ≈ -x²/2 + x⁴/24 - x⁶/720
    const expectedReal = Math.cos(x) - 1;
    expect(result.re).toBeCloseTo(expectedReal, 14);
  });
});