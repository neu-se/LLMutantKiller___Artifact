import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot with large real part", () => {
  it("should correctly compute log of complex number with large real part and small imaginary part", () => {
    // Use a value where _a >= 3000 but _b < 3000
    // With the mutation: if (true && _b < 3000) - this would use the non-overflow-safe path
    // With original: if (_a < 3000 && _b < 3000) - this would use the overflow-safe path
    // For very large values, a*a overflows to Infinity, causing wrong results
    
    const a = 1e200;
    const b = 1;
    
    // log(a + bi) should have real part = logHypot(a, b) = log(sqrt(a^2 + b^2)) ≈ log(a)
    const result = new Complex(a, b).log();
    
    // Expected: real part ≈ Math.log(a) = 200 * Math.log(10) ≈ 460.517...
    const expected = Math.log(a); // approximately 460.517...
    
    expect(result.re).toBeCloseTo(expected, 5);
  });
});