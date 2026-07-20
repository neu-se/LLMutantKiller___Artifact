import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot large values", () => {
  it("should correctly compute log of a complex number with large real part and small imaginary part", () => {
    // logHypot(1e200, 1) should be approximately 200 * Math.LN10
    // With the mutation (true && _b < 3000), it would compute Math.log(1e200 * 1e200 + 1) * 0.5
    // which overflows to Infinity
    // With original code (_a < 3000 && _b < 3000), it takes the safe path
    const result = new Complex(1e200, 1).log();
    expect(isFinite(result.re)).toBe(true);
    expect(result.re).toBeCloseTo(200 * Math.LN10, 5);
  });
});