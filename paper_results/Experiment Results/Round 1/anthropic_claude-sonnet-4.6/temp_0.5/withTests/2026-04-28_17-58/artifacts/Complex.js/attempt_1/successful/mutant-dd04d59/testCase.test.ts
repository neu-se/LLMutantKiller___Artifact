import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asinh mutation detection', () => {
  it('should correctly compute asinh of a complex number with non-zero imaginary part', () => {
    // asinh(1 + i) should produce a valid complex number
    // In the mutated code, res['re'] = -res[""] = -undefined = NaN
    const z = new Complex(1, 1);
    const result = z.asinh();
    
    // The result should be approximately 1.0612750619 + 0.6662394325i
    expect(result.re).toBeCloseTo(1.0612750619, 5);
    expect(result.im).toBeCloseTo(0.6662394325, 5);
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});