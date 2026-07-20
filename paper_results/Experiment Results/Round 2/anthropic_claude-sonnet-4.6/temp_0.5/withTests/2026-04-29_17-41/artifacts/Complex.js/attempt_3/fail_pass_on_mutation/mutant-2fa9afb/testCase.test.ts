import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('should return correct result when raising non-zero complex number to a power', () => {
    // (1 + 0i)^2 = 1, not zero
    const result = new Complex(1, 0).pow(new Complex(2, 0));
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});