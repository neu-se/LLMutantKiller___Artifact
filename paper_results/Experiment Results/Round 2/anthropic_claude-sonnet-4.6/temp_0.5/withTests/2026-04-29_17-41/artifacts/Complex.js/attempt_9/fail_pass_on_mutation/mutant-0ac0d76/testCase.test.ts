import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex pow', () => {
  it('square root of negative real number should give purely imaginary result', () => {
    const result = new Complex(-4, 0).pow(0.5);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(2, 10);
  });
});