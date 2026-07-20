import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should return correct real part for asec of purely imaginary number', () => {
    // For z = 0 + 2i, the asec should have a specific real part
    // Original: uses new Complex(0, -Infinity).acos()
    // Mutated: uses new Complex(NaN, -Infinity).acos() -> NaN result
    const result = new Complex(0, 2).asec();
    // acos(0 + 2i) computed via the infinity path
    // The real part should be pi/2 for purely imaginary input
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
  });
});