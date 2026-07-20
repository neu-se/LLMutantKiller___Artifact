import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should not return NaN for acot(0 + tiny*i) where tiny causes d to underflow', () => {
    const tiny = Number.MIN_VALUE; // 5e-324
    // a=0, b=tiny: b!=0 so early return skipped
    // d = 0*0 + tiny*tiny = 0 (underflow)
    // Original: re=0 (a===0), im=-Infinity -> atan(0-Inf*i) is not NaN
    // Mutated:  re=NaN (0/0), im=-Infinity -> NaN
    const c = new Complex(0, tiny);
    const result = c.acot();
    expect(result.isNaN()).toBe(false);
  });
});