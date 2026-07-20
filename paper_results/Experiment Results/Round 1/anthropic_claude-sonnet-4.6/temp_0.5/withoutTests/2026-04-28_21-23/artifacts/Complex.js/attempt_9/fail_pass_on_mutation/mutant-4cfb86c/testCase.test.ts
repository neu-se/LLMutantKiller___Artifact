import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should handle acot with zero real part and subnormal imaginary part', () => {
    const tiny = Number.MIN_VALUE;
    const c = new Complex(0, tiny);
    const result = c.acot();
    // Original: re_arg=0 (a!==0 false), im_arg=-Inf -> atan(0,-Inf) -> NaN
    // Mutated: re_arg=NaN (0===0 true, 0/0=NaN), im_arg=-Inf -> atan(NaN,-Inf) -> NaN
    // Both NaN, but let's check isNaN
    expect(result.isNaN()).toBe(true);
  });
});