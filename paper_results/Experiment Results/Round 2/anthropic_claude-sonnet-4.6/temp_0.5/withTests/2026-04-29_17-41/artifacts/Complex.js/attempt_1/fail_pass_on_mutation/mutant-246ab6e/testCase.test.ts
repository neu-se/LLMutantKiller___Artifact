import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh behavior via sin method", () => {
  it("should correctly compute sin of a complex number with imaginary part, detecting cosh mutation", () => {
    // sin(a + bi) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // For a=0, b=1: sin(0 + 1i) = sin(0)*cosh(1) + i*cos(0)*sinh(1)
    //             = 0 * cosh(1) + i * 1 * sinh(1)
    //             = 0 + i * sinh(1)
    // So re part = 0, im part = sinh(1) ≈ 1.1752011936438014
    //
    // For a=Math.PI/2, b=1: sin(pi/2 + 1i) = sin(pi/2)*cosh(1) + i*cos(pi/2)*sinh(1)
    //                      = 1 * cosh(1) + i * 0 * sinh(1)
    //                      = cosh(1) + 0i
    // cosh(1) ≈ 1.5430806348152437
    // mutated cosh(1) = Math.exp(1) ≈ 2.718281828459045
    
    const c = new Complex(Math.PI / 2, 1);
    const result = c.sin();
    
    // The real part should be cosh(1) ≈ 1.5430806348152437
    const expectedRe = Math.cosh(1); // Use native Math.cosh for expected value
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});