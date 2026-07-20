import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x near zero", () => {
    // Test with a value very close to zero where the Taylor series approximation is used
    const x = 1e-5;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part should be cosm1(x) which is cos(x) - 1
    // For very small x, cos(x) - 1 ≈ -x²/2 + x⁴/24 - x⁶/720 + x⁸/40320
    // The Taylor series in the code should match this approximation
    const expectedCosm1 = Math.cos(x) - 1;
    expect(result.re).toBeCloseTo(expectedCosm1, 12);
  });
});