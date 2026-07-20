import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should handle subnormal imaginary part where a=0 and b*b underflows to 0", () => {
    // b = Number.MIN_VALUE is so small that b*b underflows to 0
    // So d = a*a + b*b = 0 + 0 = 0, reaching the d===0 branch
    // With a=0: original returns Complex(0, -Infinity).asinh()
    //           mutated returns Complex(NaN, -Infinity).asinh() -> NaN result
    const a = 0;
    const b = Number.MIN_VALUE; // 5e-324, b*b === 0 due to underflow
    
    // Verify our assumption
    expect(b * b).toBe(0); // subnormal underflow
    expect(b).not.toBe(0); // but b itself is not zero
    
    const result = new Complex(a, b).acsch();
    
    // Original: Complex(0, -Infinity).asinh() should give a non-NaN result
    // Mutated: Complex(NaN, -Infinity).asinh() should give NaN
    expect(isNaN(result.re)).toBe(false);
  });
});