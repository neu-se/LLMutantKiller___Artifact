import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc with zero real part and subnormal imaginary part should have defined real part", () => {
    // a=0, b=Number.MIN_VALUE: d = 0+b*b underflows to 0, early return skipped (b !== 0)
    // Original else branch: new Complex((a!==0)?a/0:0, (b!==0)?-b/0:0).asin()
    //   = new Complex(0, -Infinity).asin() -> finite result
    // Mutated else branch: new Complex((true)?a/0:0, (b!==0)?-b/0:0).asin()
    //   = new Complex(NaN, -Infinity).asin() -> NaN result
    const result = new Complex(0, Number.MIN_VALUE).acsc();
    // Original: asin(0 - Infinity*i) has a defined real part (= 0)
    expect(result.re).toBe(0);
  });
});