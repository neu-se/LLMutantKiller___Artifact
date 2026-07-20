import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh function", () => {
  it("should correctly compute sinh for non-zero complex numbers", () => {
    // sinh(1 + i) should return a valid complex number, not ZERO
    // The mutation changes `if (a === 0 && b === 0)` to `if (true)` in the sinh method
    // This means sinh of any number would return ZERO in the mutated code
    const c = new Complex(1, 1);
    const result = c.sinh();
    
    // sinh(1 + i) = sinh(1)*cos(1) + i*cosh(1)*sin(1)
    const expectedRe = Math.sinh(1) * Math.cos(1);
    const expectedIm = Math.cosh(1) * Math.sin(1);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});