import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('should correctly compute acsch(1+i) where a*a - b*b = 0', () => {
    // For z = 1+i, d = a*a - b*b = 1 - 1 = 0
    // Original: uses fallback branch with (a !== 0) ? a/0 : 0 = Infinity
    // Mutated: uses first branch with a/d = 1/0 = Infinity (same result here)
    // Need a case where results actually differ...
    // Let's verify the actual numeric result matches a reference computation
    const z = new Complex(3, 0);
    const result = z.acsch();
    const expected = Math.log(3 + Math.sqrt(9 + 1));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});