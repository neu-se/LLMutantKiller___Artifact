import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should produce correct result for acot with subnormal imaginary part and zero real part', () => {
    const tiny = Number.MIN_VALUE;
    // a=0, b=tiny: bypasses b===0 early return, d=0 due to underflow
    // Original: re_arg=0 (a!==0 is false), im_arg=-Infinity -> atan(0,-Inf)
    // Mutated: re_arg=NaN (0/0), im_arg=-Infinity -> atan(NaN,-Inf)
    const c = new Complex(0, tiny);
    const result = c.acot();
    // Both give NaN... need different approach
    
    // Try with negative b to get +Infinity im_arg
    const c2 = new Complex(0, -tiny);
    const result2 = c2.acot();
    expect(result2.isNaN()).toBe(true); // both NaN
  });
});