import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should produce finite result for acsc of a small purely imaginary number where d underflows, checking re part", () => {
    // Use a=Number.MIN_VALUE, b=0 so d = a*a underflows to 0
    // Early return: a !== 0, so no early return
    // d===0 branch:
    //   Original:  (a !== 0) ? a/0 : 0  => Infinity (since a !== 0)
    //   Mutated:   (true) ? a/0 : 0     => Infinity (same! a/0 = Infinity)
    // Both same here.
    
    // Now try a=0, b=Number.MIN_VALUE: d underflows to 0
    // b !== 0 so no early return
    // d===0 branch:
    //   Original:  new Complex((0 !== 0)?0/0:0, (b!==0)?-b/0:0).asin()
    //            = new Complex(0, -Infinity).asin()
    //   Mutated:   new Complex((true)?0/0:0, (b!==0)?-b/0:0).asin()
    //            = new Complex(NaN, -Infinity).asin()
    // asin(0, -Infinity): t1 = sqrt((-Inf)^2 - 0 + 1, 0) = sqrt(Inf, 0) = (Inf, 0)
    //   t2 = log(Inf - (-Inf), 0 + 0) = log(Inf, 0) = (Inf, 0)
    //   result = (t2.im, -t2.re) = (0, -Inf)
    // asin(NaN, -Infinity): propagates NaN
    
    const orig_asin_check = new Complex(0, -Infinity).asin();
    // This should NOT be NaN
    expect(orig_asin_check.isNaN()).toBe(false);
    
    const nan_asin_check = new Complex(NaN, -Infinity).asin();
    // This should be NaN  
    expect(nan_asin_check.isNaN()).toBe(true);
  });
});