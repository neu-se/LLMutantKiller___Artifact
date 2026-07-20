import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow zero base', () => {
  it('should return ZERO for 0^(positive real) but not for nonzero base', () => {
    // 0^2 should be 0
    expect(new Complex(0, 0).pow(new Complex(2, 0)).re).toBe(0);
    // With if(true), (1+0i)^(0.5+0i) would wrongly return 0 
    // since b===0, a>0 triggers early return Math.pow(a, z.re)
    // Need to find path that reaches the if(a===0&&b===0) check
    // Try purely imaginary base with non-integer exponent
    const result = new Complex(0, 2).pow(new Complex(3, 0));
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-8, 5);
  });
});