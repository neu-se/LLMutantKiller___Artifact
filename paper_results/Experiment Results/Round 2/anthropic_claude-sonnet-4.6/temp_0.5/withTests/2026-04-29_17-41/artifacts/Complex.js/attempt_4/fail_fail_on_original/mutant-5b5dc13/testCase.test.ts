import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should handle subnormal inputs where both a and b squared underflow to zero", () => {
    const val = Number.MIN_VALUE; // val*val === 0 due to underflow
    expect(val * val).toBe(0);
    expect(val).not.toBe(0);
    
    // d = val*val + val*val = 0, b !== 0 so no early return
    // d===0 branch with a=val (nonzero):
    // Original: re = (a !== 0) ? a/0 : 0 = Infinity
    // Mutated:  re = (a === 0) ? a/0 : 0 = 0
    // Complex(Infinity, -Infinity).asinh() vs Complex(0, -Infinity).asinh()
    const result = new Complex(val, val).acsch();
    const resultWithZeroA = new Complex(0, val).acsch();
    
    // These should differ between original and mutated
    expect(result.re).not.toEqual(resultWithZeroA.re);
  });
});