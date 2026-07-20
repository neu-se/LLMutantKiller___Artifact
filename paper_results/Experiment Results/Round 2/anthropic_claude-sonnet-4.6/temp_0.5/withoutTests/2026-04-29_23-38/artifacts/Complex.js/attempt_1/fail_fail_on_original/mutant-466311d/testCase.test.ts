import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot overflow behavior via log()", () => {
  it("should correctly compute log of a complex number with very large real part and small imaginary part", () => {
    // When re is very large (>= 3000) and im is small but nonzero,
    // the original code uses overflow-safe path, mutated code uses fast path which overflows
    const c = new Complex(1e200, 1);
    const result = c.log();
    // log(1e200 + i) ≈ log(1e200) + i*atan2(1, 1e200) ≈ 200*ln(10) + i*~0
    const expectedRe = Math.log(1e200); // approximately 460.517...
    expect(result.re).toBeCloseTo(expectedRe, 5);
    expect(isFinite(result.re)).toBe(true);
  });
});