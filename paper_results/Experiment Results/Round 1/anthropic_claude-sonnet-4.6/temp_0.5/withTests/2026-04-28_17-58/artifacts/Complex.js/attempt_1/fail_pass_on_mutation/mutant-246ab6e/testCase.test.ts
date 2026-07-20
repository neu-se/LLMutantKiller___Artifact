import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh function correctness via sin of complex number", () => {
  it("should correctly compute sin(1 + i) using proper cosh implementation", () => {
    // sin(a + bi) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // For z = 1 + i:
    //   re = sin(1) * cosh(1) ≈ 0.8414709848 * 1.5430806348 ≈ 1.2984575814
    //   im = cos(1) * sinh(1) ≈ 0.5403023059 * 1.1752011936 ≈ 0.6349639148
    //
    // With mutated cosh(x) = exp(x) instead of (exp(x)+exp(-x))/2:
    //   re = sin(1) * exp(1) ≈ 0.8414709848 * 2.71828182845 ≈ 2.2873552872
    //   This would be wrong.
    
    const z = new Complex(1, 1);
    const result = z.sin();
    
    const expectedRe = Math.sin(1) * Math.cosh(1);
    const expectedIm = Math.cos(1) * Math.sinh(1);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});