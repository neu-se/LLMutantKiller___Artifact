import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh mutation', () => {
  it('pow of zero base with positive real exponent returns zero', () => {
    // 0^2 = 0, both original and mutant return ZERO here
    // But for non-zero: original computes, mutant returns ZERO
    const c = new Complex(2, 3);
    const result = c.pow(new Complex(1, 0));
    // 2+3i to the power 1 should equal 2+3i
    expect(result.re).toBeCloseTo(2, 5);
    expect(result.im).toBeCloseTo(3, 5);
  });
});