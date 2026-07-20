import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should return correct imaginary part for asec of purely imaginary number', () => {
    // For z = 0 + 1i:
    // Original: new Complex(0, -Infinity).acos() - uses 0 as real part
    // Mutated: new Complex(NaN, -Infinity).acos() - uses NaN as real part
    // The imaginary parts of these acos calls should differ
    const result = new Complex(0, 1).asec();
    // The imaginary part should be finite/specific in original but NaN in mutated
    expect(isNaN(result.im)).toBe(false);
  });
});