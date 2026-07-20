import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('should return zero when raising 0+0i to a positive real power', () => {
    const result = new Complex(0, 0).pow(3);
    expect(result.isZero()).toBe(true);
  });
});