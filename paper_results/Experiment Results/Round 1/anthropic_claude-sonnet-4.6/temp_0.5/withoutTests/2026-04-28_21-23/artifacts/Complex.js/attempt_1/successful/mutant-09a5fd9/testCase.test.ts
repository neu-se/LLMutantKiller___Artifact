import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the real part of sech using cosh(a)*cos(b) not 1/cosh(a)*cos(b)", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For c = a + bi:
    // Re(sech(c)) = 2*cosh(a)*cos(b) / (cos(2b) + cosh(2a))
    // The mutation changes cosh(a) to 1/cosh(a) in the numerator
    
    // Use a = 2, b = 0 to make the test clear
    // sech(2) = 1/cosh(2) = 2/(e^2 + e^-2)
    // With original: re = 2*cosh(2)*cos(0) / (cos(0) + cosh(4)) = 2*cosh(2) / (1 + cosh(4))
    // With mutation: re = 2/cosh(2)*cos(0) / (cos(0) + cosh(4)) = 2/cosh(2) / (1 + cosh(4))
    
    const a = 2;
    const b = 0;
    const coshA = Math.cosh(a);
    const cosB = Math.cos(b);
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    
    const expectedRe = 2 * coshA * cosB / d;
    const mutatedRe = 2 / coshA * cosB / d;
    
    // Verify these are actually different values
    expect(expectedRe).not.toBeCloseTo(mutatedRe, 10);
    
    const result = new Complex(a, b).sech();
    
    // The original should produce expectedRe
    expect(result.re).toBeCloseTo(expectedRe, 10);
    // The original should NOT produce mutatedRe
    expect(result.re).not.toBeCloseTo(mutatedRe, 5);
  });
});