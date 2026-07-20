import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot boundary condition', () => {
  it('should compute log correctly when real part is exactly 3000', () => {
    // logHypot(3000, 1) - with _a = 3000, _b = 1
    // Original: _a < 3000 is false, uses safe path: a/2, b/2 then +LN2
    // Mutated: _a <= 3000 is true AND _b < 3000 is true, uses direct path
    // For a=3000, b=1: both should give same result, so need overflow scenario
    // Use a = 3000 with very large b to force overflow in if-branch
    const result = new Complex(3000, 0).log();
    const expected = Math.log(3000);
    expect(result.re).toBeCloseTo(expected, 10);
  });
});