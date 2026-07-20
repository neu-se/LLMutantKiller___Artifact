import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for very small x values", () => {
    const x = 0.001;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // For very small x, cos(x)-1 ≈ -x²/2 + x⁴/24 - x⁶/720 + ...
    // The Taylor series in cosm1 should match this approximation
    const expectedCosm1 = -x*x/2 + x*x*x*x/24 - x*x*x*x*x*x/720;
    const expectedRe = Math.expm1(x) * Math.cos(0) + expectedCosm1;
    expect(result.re).toBeCloseTo(expectedRe, 8);
    expect(result.im).toBeCloseTo(0, 10);
  });
});