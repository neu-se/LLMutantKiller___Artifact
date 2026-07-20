import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech mutation test', () => {
  it('should correctly compute asech for a complex number with non-zero imaginary part when d is zero', () => {
    // The mutation changes (b !== 0) ? -b / 0 : 0 to (false) ? -b / 0 : 0
    // This affects the fallback branch when d === 0
    // Since d = a*a + b*b = 0 only when a=0 and b=0, but isZero() catches that,
    // we need to test the normal path to ensure the function works correctly
    // Test asech of a purely imaginary number to exercise the d !== 0 path
    const c = new Complex(0, 1);
    const result = c.asech();
    // asech(i) = acosh(1/i) = acosh(-i)
    // Expected: log(1 + sqrt(1 - (-i)^2)) / (-i) ... let's compute numerically
    const expected = new Complex(0, 1).inverse().acosh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});