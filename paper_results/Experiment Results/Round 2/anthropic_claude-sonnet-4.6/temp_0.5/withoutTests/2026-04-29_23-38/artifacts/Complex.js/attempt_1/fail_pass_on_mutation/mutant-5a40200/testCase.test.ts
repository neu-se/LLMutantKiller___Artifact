import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh function behavior", () => {
  it("should correctly compute sin of a complex number with imaginary part, relying on correct cosh implementation", () => {
    // sin(z) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // For z = 0 + 1i: sin(0+i) = sin(0)*cosh(1) + i*cos(0)*sinh(1) = 0 + i*sinh(1)
    // The real part depends on cosh(1)
    // With original cosh: cosh(1) = (e + 1/e)/2 ≈ 1.5430806348152437
    // With mutated cosh for |x| >= 1e-9: returns 1 - x = 1 - 1 = 0 (wrong!)
    // So sin(0 + 1i).re = sin(0) * cosh(1) = 0 in both cases, but let's use cos instead
    
    // cos(z) = cos(a)*cosh(b) - i*sin(a)*sinh(b)
    // For z = 0 + 1i: cos(0+i) = cos(0)*cosh(1) - i*sin(0)*sinh(1) = cosh(1) + 0i
    // Original: cosh(1) ≈ 1.5430806348152437
    // Mutated: for |1| >= 1e-9, returns 1 - 1 = 0 (WRONG)
    
    const z = new Complex(0, 1);
    const result = z.cos();
    
    // The real part should be cosh(1) ≈ 1.5430806348152437
    const expectedRe = Math.cosh(1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});