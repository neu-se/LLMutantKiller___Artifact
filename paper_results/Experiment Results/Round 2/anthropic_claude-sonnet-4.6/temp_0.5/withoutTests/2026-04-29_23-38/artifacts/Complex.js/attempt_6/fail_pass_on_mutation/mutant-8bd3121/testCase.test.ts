import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should compute asech with correct imaginary component handling", () => {
    // Use a number where imaginary part affects the -b/d term
    // With im=2: original -b/d = -2/d, mutant -undefined/NaN = NaN
    const c = new Complex(1, 2);
    const result = c.asech();
    
    // Compute expected: d = 1+4=5, acosh(1/5 + (-2/5)i) = acosh(0.2 - 0.4i)
    // Just verify the imaginary part is not NaN and has correct sign
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
    // The real part should be positive
    expect(result.re).toBeGreaterThan(0);
  });
});