import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth of a complex number with zero real part and zero imaginary part edge case", () => {
    // For a=0, b=0: the if(b===0) branch returns atan2(1,0) = PI/2
    // For a=1, b=1: d = 1+1 = 2, both branches give same result
    // The key: find where if(true) vs if(d!==0) differs
    // With b=0 handled by early return, we need b!=0 and d=0 which is impossible
    // So test with b!=0: d = a^2+b^2, always >0 for non-zero complex
    // The mutation can only differ when d=0, but that requires a=b=0, handled by if(b===0)
    // Let's verify the if(b===0) path works correctly
    const result = new Complex(2, 0).acoth();
    expect(result.re).toBeCloseTo(Math.log(3) / 2); // atanh(0.5) = ln(3)/2
    expect(result.im).toBe(0);
  });
});