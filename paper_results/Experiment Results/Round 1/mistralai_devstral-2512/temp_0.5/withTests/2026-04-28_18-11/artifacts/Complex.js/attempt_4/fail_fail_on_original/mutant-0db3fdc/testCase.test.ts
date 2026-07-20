import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function mutation test", () => {
  it("should correctly compute cos(x) - 1 for very small x values", () => {
    // Test with a very small value where the Taylor series approximation is critical
    const x = 0.0001;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part should be cos(x) - 1
    // For very small x, cos(x) - 1 ≈ -x²/2 + x⁴/24 - x⁶/720 + ...
    const expectedReal = Math.cos(x) - 1;
    // The imaginary part should be 0 for real input
    expect(result.im).toBeCloseTo(0, 10);
    // The real part should match the expected value with high precision
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});