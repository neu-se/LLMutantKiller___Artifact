import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh function", () => {
  it("should correctly compute sinh for a non-zero complex number", () => {
    // sinh(1 + i) should have non-zero real and imaginary parts
    // sinh(a + bi) = sinh(a)*cos(b) + i*cosh(a)*sin(b)
    // For a=1, b=1: sinh(1)*cos(1) + i*cosh(1)*sin(1)
    const c = new Complex(1, 1);
    const result = c.sinh();
    
    // The mutation changes the condition from (a === 0 && b === 0) to (true)
    // which would cause sinh to return ZERO for any input instead of computing correctly
    // sinh(1 + i) real part = sinh(1)*cos(1) ≈ 1.1752 * 0.5403 ≈ 0.6350
    const expectedRe = Math.sinh(1) * Math.cos(1);
    const expectedIm = Math.cosh(1) * Math.sin(1);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});