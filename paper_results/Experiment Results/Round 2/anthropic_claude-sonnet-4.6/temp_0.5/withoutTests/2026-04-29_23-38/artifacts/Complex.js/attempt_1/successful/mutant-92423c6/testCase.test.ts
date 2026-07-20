import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function via expm1", () => {
  it("should compute expm1 with small imaginary part accurately using correct Taylor series sign", () => {
    // expm1(0 + bi) = exp(0)*cos(b) - 1 + i*exp(0)*sin(b)
    //              = cos(b) - 1 + i*sin(b)
    // The real part uses cosm1(b) = cos(b) - 1
    // The mutation changes + 1/40320 to - 1/40320 in the Taylor series
    // For b = 0.5, the difference is about 2 * (0.5^2)^4 / 40320 ≈ 1.9e-8
    
    const b = 0.5;
    const result = new Complex(0, b).expm1();
    
    // Expected real part: cos(0.5) - 1
    const expectedRe = Math.cos(b) - 1;
    
    // The mutation would produce a value off by ~1.9e-8
    // We check that the result matches the true value within 1e-10
    expect(Math.abs(result.re - expectedRe)).toBeLessThan(1e-10);
  });
});