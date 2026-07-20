import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.000001", () => {
    const x = 0.000001;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // For very small x, we can use the Taylor series approximation
    // cos(x) - 1 ≈ -x²/2 + x⁴/24 - x⁶/720 + x⁸/40320 - x¹⁰/3628800 + x¹²/479001600
    const expectedCosm1 = -x*x/2 + x*x*x*x/24 - x*x*x*x*x*x/720 + x*x*x*x*x*x*x*x/40320 - x*x*x*x*x*x*x*x*x*x/3628800 + x*x*x*x*x*x*x*x*x*x*x*x/479001600;
    const expectedRe = Math.expm1(x) * Math.cos(0) + expectedCosm1;
    expect(result.re).toBeCloseTo(expectedRe, 16);
    expect(result.im).toBeCloseTo(0, 16);
  });
});