import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow mutation test', () => {
  it('should return zero when raising zero to a positive real power', () => {
    const result = new Complex(0, 0).pow(new Complex(2, 0));
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.isZero()).toBe(true);
    // The key: with im=0 exponent, original returns ZERO singleton early
    // Mutated falls through to general formula which may produce -0 or NaN
    const result2 = new Complex(0, 0).pow(1);
    expect(Object.is(result2.re, 0)).toBe(true);
    expect(Object.is(result2.im, 0)).toBe(true);
  });
});