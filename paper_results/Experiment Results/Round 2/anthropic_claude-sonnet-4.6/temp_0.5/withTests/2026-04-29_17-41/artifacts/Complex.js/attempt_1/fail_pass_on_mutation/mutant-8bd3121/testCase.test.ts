import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asech mutation detection', () => {
  it('should correctly compute asech for a real number with non-zero imaginary part', () => {
    // asech(0.5) = acosh(2) which is a real number: log(2 + sqrt(3)) ≈ 1.3169578969248166
    const result = new Complex(0.5, 0).asech();
    // Original: b = this['im'] = 0, so d = 0.25, result is real
    // Mutated: b = undefined, d = NaN, result is NaN
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});