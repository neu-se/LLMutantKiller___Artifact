import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('should return zero when raising 0+0i to a complex power with positive imaginary part', () => {
    const result = new Complex(0, 0).pow(new Complex(1, 1));
    expect(result.isZero()).toBe(true);
  });
});