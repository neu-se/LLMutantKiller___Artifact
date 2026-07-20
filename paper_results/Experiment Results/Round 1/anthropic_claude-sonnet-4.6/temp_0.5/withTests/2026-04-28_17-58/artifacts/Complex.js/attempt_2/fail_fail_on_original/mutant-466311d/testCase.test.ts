import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot with large real part and moderate imaginary part", () => {
  it("should correctly compute log of complex number where _a >= 3000 and _b < 3000", () => {
    // When _a >= 3000 and _b < 3000:
    // Original: uses overflow-safe path (a/2, b/2)
    // Mutant: uses fast path Math.log(a*a + b*b)*0.5, which overflows for large a
    
    const a = 1e200;
    const b = 2000; // _b < 3000 so mutant takes fast path; _a >= 3000 so original takes safe path
    
    const result = new Complex(a, b).log();
    
    // Expected real part: log(sqrt(a^2 + b^2)) ≈ log(a) since a >> b
    const expected = Math.log(a);
    
    expect(isFinite(result.re)).toBe(true);
    expect(result.re).toBeCloseTo(expected, 5);
  });
});