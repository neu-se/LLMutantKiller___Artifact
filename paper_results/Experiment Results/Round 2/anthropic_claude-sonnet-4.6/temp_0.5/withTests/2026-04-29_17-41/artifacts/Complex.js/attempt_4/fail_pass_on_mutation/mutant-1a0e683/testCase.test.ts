import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('should return positive zero (not negative zero) when raising 0+0i to a positive real power with zero imaginary exponent', () => {
    const result = new Complex(0, 0).pow(new Complex(1, 0));
    // Original returns Complex.ZERO with re=0 (positive zero)
    // Mutated falls through to general formula returning re=-0
    expect(Object.is(result.re, 0)).toBe(true);
  });
});