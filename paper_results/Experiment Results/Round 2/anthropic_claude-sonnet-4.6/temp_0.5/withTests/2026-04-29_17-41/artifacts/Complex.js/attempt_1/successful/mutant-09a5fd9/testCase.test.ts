import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the real part of sech using cosh(a)*cos(b), not 1/cosh(a)*cos(b)", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For c = a + bi:
    // Re(sech(c)) = 2*cosh(a)*cos(b) / (cos(2b) + cosh(2a))
    // The mutation changes cosh(a) to 1/cosh(a) in the numerator
    
    // Use a = 2, b = 0 for simplicity
    // sech(2) = 1/cosh(2) = 2/(e^2 + e^-2)
    const c = new Complex(2, 0);
    const result = c.sech();
    
    const a = 2;
    const b = 0;
    const coshA = Math.cosh(a);
    const cosB = Math.cos(b);
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    
    // Original: 2 * cosh(a) * cos(b) / d
    const expectedRe = 2 * coshA * cosB / d;
    
    // Mutated would give: 2 / cosh(a) * cos(b) / d = 2 * cos(b) / (cosh(a) * d)
    const mutatedRe = 2 / coshA * cosB / d;
    
    // Verify they are different (so the test is meaningful)
    expect(Math.abs(expectedRe - mutatedRe)).toBeGreaterThan(1e-10);
    
    // The actual sech(2) = 1/cosh(2)
    const expected = 1 / Math.cosh(2);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});