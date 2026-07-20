import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should return a specific re value when a=0 and b is so small that b*b underflows to 0", () => {
    // With a=0 and b=1e-200: d = 0*0 + (1e-200)*(1e-200) = 0 (underflows)
    // Early return condition: a===0 && b===0 is FALSE (b !== 0)
    // So we reach the d===0 branch:
    //   Original:  new Complex((a !== 0) ? a/0 : 0, ...) = new Complex(0, ...)
    //   Mutated:   new Complex((true) ? a/0 : 0, ...)    = new Complex(0/0=NaN, ...)
    // 
    // Original: new Complex(0, (b!==0)?-b/0:0) = new Complex(0, -Infinity).asin()
    // Mutated:  new Complex(NaN, -Infinity).asin()
    //
    // Let's check what new Complex(0, -Infinity).asin() gives vs new Complex(NaN, -Infinity).asin()
    // by checking the re part specifically
    
    const result = new Complex(0, 1e-200).acsc();
    // In original: passes new Complex(0, -Infinity) to asin
    // In mutated: passes new Complex(NaN, -Infinity) to asin
    // The re part: original should be 0 (from asin of purely imaginary)
    // mutated should be NaN
    expect(result.re).toBe(0);
  });
});