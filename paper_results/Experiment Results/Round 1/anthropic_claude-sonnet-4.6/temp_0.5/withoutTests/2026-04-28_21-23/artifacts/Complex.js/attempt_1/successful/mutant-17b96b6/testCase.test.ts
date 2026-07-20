import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should return Complex(0, PI/2) only when both real and imaginary parts are zero, not for non-zero inputs", () => {
    // For a non-zero complex number like (2, 0), acoth should NOT return (0, PI/2)
    // The mutation changes `if (a === 0 && b === 0)` to `if (true)`,
    // which means acoth always returns Complex(0, PI/2) instead of computing the actual result.
    
    const c = new Complex(2, 0);
    const result = c.acoth();
    
    // acoth(2) = atanh(1/2) = 0.5 * ln(3) ≈ 0.5493...
    // The imaginary part should be 0, not PI/2
    expect(result.im).toBeCloseTo(0, 10);
    expect(result.re).toBeCloseTo(Math.log(3) / 2, 10);
  });
});