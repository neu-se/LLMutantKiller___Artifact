import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('pow reaches the zero-base check: 0^(2+3i) should be ZERO but 1^(2+3i) should not', () => {
    const result = new Complex(1, 0).pow(new Complex(2, 3));
    expect(result.re).not.toBeCloseTo(0, 5);
  });
});