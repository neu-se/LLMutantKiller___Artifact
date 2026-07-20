import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex mutation detection', () => {
  it('isZero should return false for complex number with zero real but nonzero imaginary', () => {
    // isZero: return this['im'] === 0 && this['re'] === 0
    // If && became ||: Complex(0, 5).isZero() would return true!
    const c = new Complex(0, 5);
    expect(c.isZero()).toBe(false);
    
    // This affects pow: if isZero returns true for (0,5), pow would return ONE
    const result = new Complex(2, 0).pow(new Complex(0, 5));
    expect(result.re).not.toBeCloseTo(1, 5);
  });
});