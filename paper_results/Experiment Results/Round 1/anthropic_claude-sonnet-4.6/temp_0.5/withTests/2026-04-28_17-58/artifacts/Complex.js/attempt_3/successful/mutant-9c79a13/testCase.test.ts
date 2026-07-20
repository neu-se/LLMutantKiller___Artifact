import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should compute sech(1 + i) with the real part using cos(b) multiplication", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    
    // The original code computes: re = 2 * cosh(a) * cos(b) / d
    // The mutated code computes:  re = 2 * cosh(a) / cos(b) / d
    // These differ by a factor of cos(b)^2 = cos(1)^2
    // 
    // The original and mutated differ by factor cos(1)^2 ≈ 0.2919
    // Original re ≈ 0.4983, mutated re ≈ 0.4983 / cos(1)^2 ≈ 1.707
    //
    // We can verify: result.re * cos(1) should equal result.im * (-sin(1)/sinh(1))
    // i.e., re/im ratio should be cosh(1)*cos(1) / (sinh(1)*sin(1))
    
    const a = 1;
    const b = 1;
    const coshA = Math.cosh(a);
    const cosB = Math.cos(b);
    const sinhA = Math.sinh(a);
    const sinB = Math.sin(b);
    
    // Original: re = 2*cosh(a)*cos(b)/d, im = -2*sinh(a)*sin(b)/d
    // So re/im = -cosh(a)*cos(b) / (sinh(a)*sin(b))
    const expectedRatio = -(coshA * cosB) / (sinhA * sinB);
    const actualRatio = result.re / result.im;
    
    expect(actualRatio).toBeCloseTo(expectedRatio, 10);
  });
});