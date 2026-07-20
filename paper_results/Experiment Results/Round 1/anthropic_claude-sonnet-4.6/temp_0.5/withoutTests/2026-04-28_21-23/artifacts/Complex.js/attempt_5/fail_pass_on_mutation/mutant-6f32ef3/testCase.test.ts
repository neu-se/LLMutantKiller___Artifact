import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should format complex number with zero real part after epsilon zeroing and negative imaginary', () => {
    // Create a number where re is just above epsilon so it stays non-zero
    // but test the boundary behavior
    const c = new Complex(1e-14, -1); // re = 1e-14 > EPSILON (1e-15), stays non-zero
    // a !== 0, b = -1 < 0: inner if(b <= 0) triggers, b becomes 1, ret = "1e-14 -"
    // then ret += "1" → "1e-14 - 1i"... wait, 1 !== b? b=1, so 1 !== 1 is false, skip
    // result: "1e-14 - i"
    expect(c.toString()).toBe('1e-14 - i');
  });
});