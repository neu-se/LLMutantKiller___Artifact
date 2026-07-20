import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("expm1 with small imaginary argument uses cosm1 correctly", () => {
  it("should compute expm1 accurately for purely imaginary input, detecting cosm1 sign mutation", () => {
    // For z = 0 + 0.5i:
    // expm1(z) = exp(0)*cos(0.5) - 1 + i*exp(0)*sin(0.5)
    //          = cos(0.5) - 1 + i*sin(0.5)
    // cosm1(0.5) uses Taylor series since |0.5| < π/4
    // Original: uses -1/720 term (correct Taylor series for cos(x)-1)
    // Mutated:  uses +1/720 term (wrong sign)
    // The difference is 2 * (1/720) * 0.5^6 ≈ 4.34e-5, well above EPSILON
    
    const b = 0.5;
    const z = new Complex(0, b);
    const result = z.expm1();
    
    // Expected real part: cos(0.5) - 1
    const expectedRe = Math.cos(b) - 1;
    // Expected imaginary part: sin(0.5)
    const expectedIm = Math.sin(b);
    
    // The tolerance should be tight enough to catch the mutation
    // but loose enough to allow for floating point precision
    const tolerance = 1e-10;
    
    expect(Math.abs(result.re - expectedRe)).toBeLessThan(tolerance);
    expect(Math.abs(result.im - expectedIm)).toBeLessThan(tolerance);
  });
});