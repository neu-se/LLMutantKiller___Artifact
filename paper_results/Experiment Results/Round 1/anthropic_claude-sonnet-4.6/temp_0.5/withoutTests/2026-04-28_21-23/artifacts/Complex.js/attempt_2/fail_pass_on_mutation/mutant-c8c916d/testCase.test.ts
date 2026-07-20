import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc of 5e-200 + 5e-200*i should give correct result via d=0 branch', () => {
    // a*a + b*b underflows to 0 but a !== 0
    const a = 5e-200;
    const b = 5e-200;
    // d = a*a + b*b = 0 due to underflow, but a !== 0
    // Original: passes (a/0 = Infinity) to asin
    // Mutated: passes 0 to asin
    const result = new Complex(a, b).acsc();
    const resultRe = result.re;
    const resultIm = result.im;
    // The result should involve Infinity in the original
    expect(isFinite(resultRe) || isFinite(resultIm)).toBe(false);
  });
});