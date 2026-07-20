import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asech', () => {
  it('computes asech of a complex number with non-zero imaginary part correctly', () => {
    // Use a complex number with non-zero imaginary part
    // asech(1 + i) should give a specific complex result
    // With mutation: b = undefined, so d = NaN, result is NaN
    // With original: b = 1, d = 1+1=2, result is valid
    const result = new Complex(1, 1).asech();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    // asech(1+i) ≈ 0.5306375... - 1.1185178...i
    expect(result.re).toBeCloseTo(0.5306375309525178, 8);
    expect(result.im).toBeCloseTo(-1.1185178796437059, 8);
  });
});