import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex div', () => {
  it('correctly handles zero numerator divided by complex number with equal magnitude components', () => {
    // (0 + 0i) / (1 - 1i) should give 0 + 0i (positive zero)
    // Original (else branch when |c|===|d|): re = (0 + 0*(-1))/2 = +0, im = (0 - 0*(-1))/2 = +0
    // Mutated (if branch when |c|===|d|): re = (0*(-1) + 0)/(-2) = -0, im = (0*(-1) - 0)/(-2) = -0
    const result = new Complex(0, 0).div(new Complex(1, -1));
    expect(Object.is(result.re, -0)).toBe(false); // should be +0, not -0
    expect(Object.is(result.im, -0)).toBe(false); // should be +0, not -0
  });
});