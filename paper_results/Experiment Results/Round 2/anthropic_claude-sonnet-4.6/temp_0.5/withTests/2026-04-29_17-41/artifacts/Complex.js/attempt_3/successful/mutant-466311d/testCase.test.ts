import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log overflow boundary", () => {
  it("should correctly compute log for complex number where a is between sqrt(MAX) and 2*sqrt(MAX)", () => {
    // a = 2e154: a*a overflows but (a/2)*(a/2) = 1e308 which is at boundary
    // Let's use 1.5e154: a*a = 2.25e308 overflows, (a/2)^2 = 5.625e307 is fine
    const a = 1.5e154;
    const result = new Complex(a, 1).log();
    const expected = Math.log(a); // approximately, since b=1 is negligible
    expect(isFinite(result.re)).toBe(true);
    expect(result.re).toBeCloseTo(expected, 3);
  });
});