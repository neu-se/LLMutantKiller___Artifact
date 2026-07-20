import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("detects mutation when d is exactly zero due to underflow", () => {
    // Find a value where x*x === 0 but x !== 0
    let tiny = Number.MIN_VALUE;
    // Number.MIN_VALUE * Number.MIN_VALUE should be 0
    // Use positive a and negative b so original gives +Infinity (not NaN path)
    const a = tiny;
    const b = -tiny;
    
    // In original: d=0, a!=0, b!=0
    //   re_arg = 0 (since a !== 0)
    //   im_arg = (b !== 0) ? -b/0 : 0 = -(-tiny)/0 = +Infinity
    //   new Complex(0, Infinity).asinh() = ?
    // In mutated:
    //   im_arg = 0
    //   new Complex(0, 0).asinh() = {re:-0, im:0}
    
    const result = new Complex(a, b).acsch();
    // Check result is not {re:0, im:0}
    expect(result.isZero()).toBe(false);
  });
});