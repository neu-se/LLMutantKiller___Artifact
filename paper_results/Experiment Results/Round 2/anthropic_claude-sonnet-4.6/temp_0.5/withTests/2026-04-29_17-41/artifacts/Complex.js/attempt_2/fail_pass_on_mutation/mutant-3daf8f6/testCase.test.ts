import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation detection", () => {
  it("detects boundary change at _a === 3000 with non-trivial imaginary part", () => {
    // When re=3000, im=2999.9:
    // _a=3000, _b=2999.9, both < 3000 in original (_a < 3000 is false), so else branch
    // In mutated: _a <= 3000 is true AND _b < 3000 is true, so if branch
    const c = new Complex(3000, 2999.9);
    const result = c.log();
    // Compute expected via else branch manually
    const a2 = 3000 / 2, b2 = 2999.9 / 2;
    const expected_re = 0.5 * Math.log(a2 * a2 + b2 * b2) + Math.LN2;
    const direct_re = Math.log(3000 * 3000 + 2999.9 * 2999.9) * 0.5;
    // These should be equal mathematically but let's check if they differ numerically
    expect(result.re).toBeCloseTo(expected_re, 14);
  });
});