import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('should return zero when raising 0+0i to a power with negative-zero imaginary part', () => {
    // z['im'] = -0: original (-0 >= 0 is true) returns ZERO, mutated (-0 > 0 is false) falls through
    const result = new Complex(0, 0).pow(new Complex(2, -0));
    expect(result.isZero()).toBe(true);
  });
});