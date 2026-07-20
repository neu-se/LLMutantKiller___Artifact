import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot boundary', () => {
  it('computes log correctly for large complex numbers where overflow matters', () => {
    // Use values > 3000 to force the overflow-safe path in original
    // With _a = 3000 exactly, original uses slow path, mutant uses fast path
    const c = new Complex(1e200, 1e200);
    const result = c.log();
    // log(sqrt(2) * 1e200) = log(sqrt(2)) + 200*log(10)
    const expected = Math.log(Math.sqrt(2)) + 200 * Math.log(10);
    expect(result.re).toBeCloseTo(expected, 5);
  });
});