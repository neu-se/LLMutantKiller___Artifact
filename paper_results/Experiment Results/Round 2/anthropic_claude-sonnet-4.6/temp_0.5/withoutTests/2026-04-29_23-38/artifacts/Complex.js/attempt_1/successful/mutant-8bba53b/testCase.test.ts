import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function via expm1", () => {
  it("should correctly compute expm1 for a complex number with small imaginary part, detecting sign change in Taylor series", () => {
    // expm1(0 + 0.5i) = cosm1(0.5) + i*sin(0.5)
    // The real part should equal cos(0.5) - 1
    // The mutation changes - 1/3628800 to + 1/3628800 in the Taylor series
    // This introduces an error of 2/3628800 * x^8 which is detectable
    
    const c = new Complex(0, 0.5);
    const result = c.expm1();
    
    // Expected real part: cos(0.5) - 1
    const expectedRe = Math.cos(0.5) - 1;
    // Expected imaginary part: sin(0.5)
    const expectedIm = Math.sin(0.5);
    
    // The mutation changes the sign of 1/3628800 term
    // For x=0.5: difference = 2/3628800 * 0.5^8 = 2/3628800 * 1/256 ≈ 2.15e-12
    // Use tolerance tighter than the mutation error but looser than floating point noise
    const tolerance = 1e-11;
    
    expect(Math.abs(result.re - expectedRe)).toBeLessThan(tolerance);
    expect(Math.abs(result.im - expectedIm)).toBeLessThan(tolerance);
  });
});