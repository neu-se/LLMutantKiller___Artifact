import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary condition at _a === 3000", () => {
  it("should compute log correctly when real part is exactly 3000", () => {
    // logHypot(3000, 1): original takes else branch (a/2, b/2 + LN2), mutant takes if branch
    // Both are mathematically equivalent for non-overflow values, so test via log()
    const c = new Complex(3000, 1);
    const result = c.log();
    const expected = Math.log(Math.sqrt(3000 * 3000 + 1));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(Math.atan2(1, 3000), 10);
  });
});