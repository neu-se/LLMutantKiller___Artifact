import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should return correct asec for tiny purely imaginary number where d underflows to zero', () => {
    // a=0, b=Number.MIN_VALUE: d = b*b underflows to 0
    // early check (a===0 && b===0) is false since b != 0
    // so we reach: new Complex((a!==0)?a/0:0, (b!==0)?-b/0:0).acos()
    // original: im = -b/0 = -Infinity (b > 0)
    // mutated:  im = +b/0 = +Infinity (b > 0)
    const c = new Complex(0, Number.MIN_VALUE);
    const result = c.asec();
    // With original code, we get new Complex(0, -Infinity).acos()
    // With mutated code, we get new Complex(0, +Infinity).acos()
    // These produce different results
    const resultNegInf = new Complex(0, -Infinity).acos();
    expect(result.re).toBeCloseTo(resultNegInf.re, 5);
    expect(result.im).toBeCloseTo(resultNegInf.im, 5);
  });
});