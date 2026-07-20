import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech with subnormal input', () => {
  it('asech of a very small nonzero real number should have infinite real part', () => {
    // Number.MIN_VALUE squared underflows to 0, triggering d===0 branch
    // Original: (a !== 0) ? a/0 : 0 => Infinity
    // Mutated:  (false) ? a/0 : 0   => 0
    const tiny = Number.MIN_VALUE;
    const result = new Complex(tiny, 0).asech();
    // The result should go through the d===0 fallback with a !== 0
    // Original code produces Infinity in real part, mutant produces 0
    expect(isFinite(result.re) || isNaN(result.re)).toBe(false);
  });
});