import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary condition", () => {
  it("should compute log correctly when imaginary part is exactly 3000", () => {
    // When b = 3000 exactly:
    // Original code: _b < 3000 is false, so uses the divide-by-2 path
    // Mutated code: _b <= 3000 is true, so uses the direct path
    // Both should approximate Math.log(3000), but via different floating-point paths
    
    const c = new Complex(0, 3000);
    const result = c.log();
    
    // The real part of log(0 + 3000i) should be log(3000)
    const expected = Math.log(3000);
    
    // Original path: 0.5 * Math.log(1500 * 1500) + Math.LN2
    const originalPath = 0.5 * Math.log(1500 * 1500) + Math.LN2;
    // Mutated path: Math.log(3000 * 3000) * 0.5
    const mutatedPath = Math.log(3000 * 3000) * 0.5;
    
    // The two paths must produce different results for this test to be meaningful
    expect(originalPath).not.toBe(mutatedPath);
    
    // The result should match the original path
    expect(result.re).toBe(originalPath);
  });
});