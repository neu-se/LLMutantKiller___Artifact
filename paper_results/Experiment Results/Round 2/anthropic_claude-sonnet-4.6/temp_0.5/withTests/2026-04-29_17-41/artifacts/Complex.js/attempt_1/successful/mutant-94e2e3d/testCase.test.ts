import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow mutation test', () => {
  it('should not return ZERO when base is 0 and exponent has re=0', () => {
    // When base is 0+0i and exponent is 0+1i (purely imaginary exponent with re=0)
    // Original: z['re'] > 0 fails (0 > 0 is false), so falls through to general computation
    // Mutated: z['re'] >= 0 is true (0 >= 0), so returns ZERO incorrectly
    const result = new Complex(0, 0).pow(new Complex(0, 1));
    // The original code falls through to general computation (NaN result likely)
    // but the mutated code returns ZERO
    expect(result.re).not.toBe(0);
  });
});