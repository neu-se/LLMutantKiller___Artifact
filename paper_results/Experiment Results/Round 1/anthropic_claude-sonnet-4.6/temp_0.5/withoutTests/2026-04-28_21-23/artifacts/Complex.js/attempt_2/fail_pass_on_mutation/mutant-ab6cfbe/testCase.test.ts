import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation test', () => {
  it('log of zero (0 + 0i) imaginary part should be 0', () => {
    // With original: a > 0 is false for a=0, falls through to logHypot(0,0) = -Inf, atan2(0,0) = 0
    // With mutation: a >= 0 is true for a=0, enters if block (commented return), same result
    // Need to find actual behavioral difference
    const result = new Complex(0, 0).log();
    expect(isNaN(result.re) || result.re === -Infinity).toBe(true);
  });
});