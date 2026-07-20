import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc mutation test', () => {
  it('should correctly compute acsc for a complex number where d is zero due to special values', () => {
    // The mutation changes -b / 0 to -b * 0 in the acsc fallback path
    // When d = a*a + b*b = 0 but b !== 0, the imaginary part should be -Infinity (from -b/0)
    // With mutation, it becomes 0 (from -b*0)
    // We can trigger this with a=0, b=0 but that hits early return
    // Instead, trigger with NaN input to get d=0 path
    // Actually, let's use a complex number where a=0 and b is non-zero tiny value
    // that causes d to underflow to 0
    
    // Use Number.MIN_VALUE to cause underflow
    const tiny = Number.MIN_VALUE;
    const c = new Complex(0, tiny);
    const result = c.acsc();
    
    // With original code: imaginary part of asin input is -Infinity -> result has Infinity component
    // With mutated code: imaginary part of asin input is 0 -> different result
    expect(isFinite(result.re) || isFinite(result.im) || isNaN(result.re) || isNaN(result.im)).toBe(true);
    
    // The key test: acsc(0 + tiny*i) should have a specific imaginary component
    // Original: passes -Infinity to asin, giving a result with Infinity
    // Mutated: passes 0 to asin, giving a finite result
    expect(isFinite(result.im)).toBe(false);
  });
});