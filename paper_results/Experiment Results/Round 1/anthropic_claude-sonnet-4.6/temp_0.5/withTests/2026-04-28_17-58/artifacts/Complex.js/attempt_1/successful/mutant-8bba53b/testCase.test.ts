import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function via expm1", () => {
  it("should compute expm1 with small imaginary part accurately using correct Taylor series sign", () => {
    // expm1(0 + 0.5i) = exp(0)*cos(0.5) - 1 + i*exp(0)*sin(0.5)
    // = cos(0.5) - 1 + i*sin(0.5)
    // The real part uses cosm1(0.5) which depends on the Taylor series
    // The mutation changes -1/3628800 to +1/3628800 in the polynomial
    const c = new Complex(0, 0.5);
    const result = c.expm1();
    
    // Expected: cos(0.5) - 1
    const expectedRe = Math.cos(0.5) - 1;
    const expectedIm = Math.sin(0.5);
    
    // The mutation introduces an error of ~2/3628800 * (0.5^2)^3 ≈ 8.6e-9
    // Use tolerance tighter than the mutation error but loose enough for floating point
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 15);
  });
});