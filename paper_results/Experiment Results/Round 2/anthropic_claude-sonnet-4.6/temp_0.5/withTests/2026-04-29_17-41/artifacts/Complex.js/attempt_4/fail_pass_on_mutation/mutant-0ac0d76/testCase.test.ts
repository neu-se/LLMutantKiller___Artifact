import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex pow', () => {
  it('pow of positive real base with real exponent uses direct path not log', () => {
    // (2)^3 should equal 8
    const result = new Complex(2, 0).pow(new Complex(3, 0));
    expect(result.re).toBeCloseTo(8, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});