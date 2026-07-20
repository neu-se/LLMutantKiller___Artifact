import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function via expm1", () => {
  it("should compute expm1 accurately for small imaginary values near pi/4", () => {
    // expm1(0 + i*b) = exp(0)*cos(b) - 1 + i*exp(0)*sin(b)
    //                = cos(b) - 1 + i*sin(b)
    // cosm1(b) = cos(b) - 1 is used internally
    // The mutation changes + 1/40320 to - 1/40320 in the Taylor series
    // This affects accuracy for b near pi/4
    
    const b = Math.PI / 4;
    const result = new Complex(0, b).expm1();
    
    // Expected: cos(pi/4) - 1 + i*sin(pi/4)
    const expectedRe = Math.cos(b) - 1;  // ≈ -0.29289321881345254
    const expectedIm = Math.sin(b);       // ≈ 0.7071067811865476
    
    // The mutation causes a difference of approximately 2 * (pi/4)^8 / 40320 ≈ 7.2e-6
    // which is much larger than EPSILON (1e-15) but we need to check with sufficient precision
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});