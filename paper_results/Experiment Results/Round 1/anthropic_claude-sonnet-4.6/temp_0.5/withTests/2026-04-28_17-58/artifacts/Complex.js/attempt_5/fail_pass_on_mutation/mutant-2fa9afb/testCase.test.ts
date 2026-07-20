import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow with non-zero base', () => {
  it('computes 1^2 = 1, not zero', () => {
    const result = new Complex(1, 0).pow(2);
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});