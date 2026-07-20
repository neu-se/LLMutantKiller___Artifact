import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary condition at b=3000", () => {
  it("should compute log correctly when imaginary part is exactly 3000", () => {
    // When b = 3000 exactly, original uses halving path, mutant uses direct path
    // logHypot(0, 3000) should equal log(3000)
    const c = new Complex(0, 3000);
    const result = c.log();
    const expected = Math.log(3000);
    // The real part of log(3000i) = log|3000i| = log(3000)
    expect(result.re).toBeCloseTo(expected, 10);
    // Check that the two computation paths give the same result
    const directPath = Math.log(3000 * 3000) * 0.5;
    const halvingPath = 0.5 * Math.log(1500 * 1500) + Math.LN2;
    // If they differ in floating point, the test will catch the mutation
    expect(result.re).toBe(halvingPath);
  });
});