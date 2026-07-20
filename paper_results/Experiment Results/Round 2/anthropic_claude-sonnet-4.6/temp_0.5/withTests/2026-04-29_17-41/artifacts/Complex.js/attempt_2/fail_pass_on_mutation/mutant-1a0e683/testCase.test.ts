import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow zero base with real positive exponent', () => {
  it('should return zero (not NaN) when raising 0+0i to a positive real exponent', () => {
    const result = new Complex(0, 0).pow(new Complex(2, 0));
    expect(result.isNaN()).toBe(false);
  });
});