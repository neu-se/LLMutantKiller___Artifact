import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan', () => {
  it('should correctly compute atan for complex number with small real part near (0, -1)', () => {
    // Use a tiny real part to avoid the special case but get near it
    const c = new Complex(1e-300, -1);
    const result = c.atan();
    // With original: b !== -1 exactly, so falls through to computation
    // d = (1e-300)^2 + (1-(-1))^2 = ~0 + 4 = 4
    // result should have very large negative imaginary part
    expect(result.im).toBeLessThan(-100);
    expect(isFinite(result.re)).toBe(true);
  });
});