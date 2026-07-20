import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('should return correct result for non-zero base raised to a power', () => {
    // (1 + i)^2 = 2i, not zero
    const result = new Complex(1, 1).pow(new Complex(2, 0));
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(2, 10);
  });
});