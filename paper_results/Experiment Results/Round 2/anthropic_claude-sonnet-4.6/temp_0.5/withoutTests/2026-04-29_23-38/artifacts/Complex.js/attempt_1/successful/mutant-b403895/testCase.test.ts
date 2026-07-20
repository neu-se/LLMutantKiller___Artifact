import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex asec edge case', () => {
  it('should return Infinity real part when a is non-zero and d underflows to 0', () => {
    // When a*a + b*b underflows to 0 but a !== 0
    // Original: a / 0 = Infinity, Mutated: a * 0 = 0
    const tiny = 5e-324; // Number.MIN_VALUE, smallest positive float
    const result = new Complex(tiny, 0).asec();
    // In original: re part comes from (a/0) = Infinity path
    // The result should have Infinity somewhere
    expect(isFinite(result.re) || isFinite(result.im)).toBe(false);
  });
});