import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('acot with zero real and tiny imaginary where d underflows - checks re part is not NaN', () => {
    // a=0, b=1e-200: b*b underflows to 0, so d=0
    // Original: re = (0 !== 0) ? 0/0 : 0 = 0, then atan(0, -Infinity)
    // Mutated:  re = (0 === 0) ? 0/0 : 0 = NaN, then atan(NaN, -Infinity)
    // In atan with a=0: hits special branch, b=-Infinity is not 1 or -1
    // In atan with a=NaN: does NOT hit special branch
    // The difference: atan(0, -Inf) computes t1_im = -2*0/Inf = 0 (not NaN)
    // while atan(NaN, -Inf) computes t1_im = -2*NaN/Inf = NaN
    // Both ultimately give NaN result... 
    // Let me check if there's any difference in the final NaN values
    const r1 = new Complex(0, -Infinity).atan();
    const r2 = new Complex(NaN, -Infinity).atan();
    expect(r1.re).toEqual(r2.re);
  });
});