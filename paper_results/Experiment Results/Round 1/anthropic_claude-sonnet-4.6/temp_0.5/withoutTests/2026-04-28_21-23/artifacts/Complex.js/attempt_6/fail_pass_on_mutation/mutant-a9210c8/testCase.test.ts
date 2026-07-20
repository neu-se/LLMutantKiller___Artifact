import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech", () => {
  it("sech(1+1i) imaginary part should be negative", () => {
    // sech(a+bi) im part = -2*sinh(a)*sin(b)/d
    // For a=1, b=1: sinh(1)*sin(1) > 0, so im < 0
    // With mutation b=undefined: sin(undefined)=NaN, result is NaN
    // With original: result is a specific negative number
    const result = new Complex(1, 1).sech();
    const a = 1, b = 1;
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    
    expect(result.im).toBeCloseTo(expectedIm, 10);
    expect(result.re).toBeCloseTo(2 * Math.cosh(a) * Math.cos(b) / d, 10);
  });
});