import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh function behavior", () => {
  it("should correctly compute sin of a complex number with imaginary part, relying on correct cosh implementation", () => {
    // sin(z) = sin(a)cosh(b) + i*cos(a)*sinh(b)
    // For z = 0 + 1i: sin(0+1i) = sin(0)*cosh(1) + i*cos(0)*sinh(1) = 0 + i*sinh(1)
    // The real part depends on cosh(1)
    // For z = 1 + 1i: sin(1+1i) = sin(1)*cosh(1) + i*cos(1)*sinh(1)
    
    // cosh(1) ≈ 1.5430806348152437
    // With original code: cosh(1) = (exp(1) + exp(-1)) / 2 ≈ 1.5430806348152437
    // With mutated code: since |1| >= 1e-9, it returns 1 - 1 = 0 (wrong!)
    
    const z = new Complex(1, 1);
    const result = z.sin();
    
    // Expected: sin(1)*cosh(1) + i*cos(1)*sinh(1)
    const expectedRe = Math.sin(1) * Math.cosh(1);
    const expectedIm = Math.cos(1) * Math.sinh(1);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});