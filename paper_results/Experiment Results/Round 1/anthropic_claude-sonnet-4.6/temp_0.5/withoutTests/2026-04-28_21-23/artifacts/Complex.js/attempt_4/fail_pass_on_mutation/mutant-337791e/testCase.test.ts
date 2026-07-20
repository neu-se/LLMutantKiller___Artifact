import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp', () => {
  it('exp of number with zero imaginary part should have exactly zero imaginary part', () => {
    const z = new Complex(5, 0);
    const result = z.exp();
    // cos(0) = 1, sin(0) = 0 exactly, so im should be exactly 0
    // If mutation causes different code path, im might differ
    expect(result.re).toBeCloseTo(Math.exp(5), 10);
    expect(Object.is(result.im, 0)).toBe(true);
  });
});