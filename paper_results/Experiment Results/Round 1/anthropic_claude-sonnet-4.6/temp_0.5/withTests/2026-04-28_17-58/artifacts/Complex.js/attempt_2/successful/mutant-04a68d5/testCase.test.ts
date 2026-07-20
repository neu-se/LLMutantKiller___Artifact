import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('sech', () => {
  it('computes sech of a real number correctly', () => {
    // sech(1) = 1/cosh(1) = 2/(e + 1/e) ≈ 0.6480542736638853
    const result = new Complex(1, 0).sech();
    expect(result.re).toBeCloseTo(1 / Math.cosh(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});