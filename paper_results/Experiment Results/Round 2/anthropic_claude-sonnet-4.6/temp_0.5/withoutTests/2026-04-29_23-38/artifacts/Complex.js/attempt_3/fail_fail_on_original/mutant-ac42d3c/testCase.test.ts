import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan', () => {
  it('should compute atan correctly for a general complex number near the special case', () => {
    // Test atan(0 + (-1+epsilon)i) - near the pole but not exactly at it
    // This exercises the path that differs between original and mutated code
    // when b is close to -1 but not equal
    const epsilon = 1e-10;
    const c = new Complex(0, -1 - epsilon);
    const result = c.atan();
    // For z = -i - epsilon*i, atan should have a very large negative imaginary part
    expect(result.im).toBeLessThan(-1e8);
    expect(isFinite(result.re)).toBe(true);
  });
});