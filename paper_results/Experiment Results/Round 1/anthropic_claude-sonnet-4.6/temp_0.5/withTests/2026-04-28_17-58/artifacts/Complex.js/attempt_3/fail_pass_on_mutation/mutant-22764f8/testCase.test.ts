import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should return a result with finite real part for asec(2)', () => {
    const result = new Complex(2, 0).asec();
    // Original: acos(0.5) ≈ π/3, imaginary = 0
    // Mutated: a=undefined, d=NaN, returns NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});