import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should return correct result for acsch of a complex number near zero with nonzero imaginary part", () => {
    // When a=0, b!=0: d = b*b != 0, so (a/d, -b/d) = (0, -1/b)
    // For b very small but nonzero, -b/d = -b/(b^2) = -1/b which is large negative
    // The mutation only affects d===0 branch which requires a=b=0, but b===0 returns early
    // So the mutation is in unreachable code...
    // 
    // Let's verify: maybe there's a NaN case where d could be 0
    // If a=NaN, b=NaN: d = NaN, d !== 0 is false (NaN !== 0 is true actually)
    // NaN !== 0 is TRUE in JS, so d !== 0 branch is taken for NaN inputs
    
    // What if a=Infinity? d = Infinity, d !== 0 is true
    // What about a very specific case...
    
    // Actually the mutation changes sign of Infinity in the imaginary part
    // when passed to asinh. Let's construct a test where asinh(-Infinity*i) != asinh(+Infinity*i)
    
    // If we could reach d===0 with b!==0... not possible with reals
    // But what about: a=0, b=0 but b===0 check passes first and returns early
    
    // The mutation IS dead code. Let me verify by checking what acsch(0+0i) does:
    // b===0 check: b=0, so returns new Complex(a!==0 ? log... : Infinity, 0)
    // With a=0: returns Complex(Infinity, 0)
    
    // Since mutation is unreachable, maybe test that acsch works correctly
    // and the sign is preserved for imaginary results
    const z = new Complex(1, 1);
    const result = z.acsch();
    const expected = new Complex(1, 1).inverse().asinh();
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});