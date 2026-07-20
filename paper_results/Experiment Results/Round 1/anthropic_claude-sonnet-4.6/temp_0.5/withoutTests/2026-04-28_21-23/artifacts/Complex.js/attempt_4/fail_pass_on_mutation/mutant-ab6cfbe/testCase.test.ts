import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log', () => {
  it('log of -0 should use general path not shortcut', () => {
    // -0 >= 0 is true in JS, but -0 > 0 is false
    const result = new Complex(-0, 0).log();
    // With original (a > 0): -0 > 0 is false, uses logHypot(-0, 0) = Math.log(0) = -Infinity, atan2(0, -0) = PI
    // With mutation (a >= 0): -0 >= 0 is true, enters if (commented return), falls through same
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});