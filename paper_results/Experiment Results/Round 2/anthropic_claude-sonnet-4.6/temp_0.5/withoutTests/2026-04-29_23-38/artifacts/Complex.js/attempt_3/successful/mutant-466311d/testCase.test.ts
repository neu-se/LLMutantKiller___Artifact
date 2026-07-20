import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex logHypot mutation detection", () => {
  it("pow operation gives finite result for large base with small imaginary exponent", () => {
    // Use pow which internally calls logHypot
    // base = 2e154 (real), exponent = 1+0i
    // logHypot(2e154, 0) hits b===0 early return, so use nonzero imaginary
    // For complex base 2e154 + 1i, logHypot(2e154, 1):
    //   _a = 2e154 >= 3000, _b = 1 < 3000
    //   Original: overflow-safe path -> finite
    //   Mutated: fast path -> Math.log(Infinity) = Infinity
    const base = new Complex(2e154, 1);
    const result = base.log();
    // 2e154 * 2e154 = 4e308 overflows, but (1e154)^2 = 1e308 is fine
    expect(Number.isFinite(result.re)).toBe(true);
    expect(result.re).toBeGreaterThan(0);
  });
});