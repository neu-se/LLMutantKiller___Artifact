import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("detects mutation by testing pow with a=0 base where case 1 of switch applies", () => {
    // Base: 0 + 2i (a=0, b=2), exponent: 4 (z['re']=4, z['im']=0)
    // b of this = 2, so b===0 is FALSE -> outer if condition not triggered
    // Goes to else if(a===0): (4%4+4)%4=0, case 0: Complex(Math.pow(2,4),0) = Complex(16,0)
    // This should work the same in both versions
    // 
    // Instead test: base 2+0i (a=2,b=0), exponent 0.5
    // Original: a>0 true -> Math.pow(2, 0.5) = sqrt(2), im=0
    // Mutated: a<=0 false -> general formula: same result
    // 
    // What about base with a=0, b=0 (zero), exponent=2?
    // z['isZero']() check comes first! Returns Complex['ONE'] if exponent is zero
    // For exponent=2: not zero
    // Original: b===0(this.im=0) && a>0(this.re=0, NO) -> false; else if(a===0) YES
    //   case (2%4+4)%4=2: Complex(-Math.pow(0,2),0) = Complex(0,0)
    // Mutated: b===0 && a<=0(0<=0 YES) -> Math.pow(0,2)=0, Complex(0,0) - same!
    
    // base=0+0i, exponent=1: case 1: Complex(0, Math.pow(0,1))=Complex(0,0) vs Math.pow(0,1)=0
    // All zero cases seem same. Need non-zero a<=0 with b=0.
    // a=-1, b=0, exponent=0.5: already tried, passes both.
    // The issue must be that general formula gives same result as Math.pow for these cases.
    
    // Try: does the general formula path vs fast path give DIFFERENT results for any input?
    // Fast path: Complex(Math.pow(a, z['re']), 0) -- always real result
    // General: can give complex result
    // For a>0, b=0: atan2(0,a)=0, so general gives real result too. Same.
    // For a<0, b=0: atan2(0,a)=π, general gives complex. Fast path gives NaN for non-integer.
    // For a<0, b=0, integer exponent: fast path gives real, general gives real (cos(n*π)=±1)
    
    // So the ONLY difference is for a<0, b=0, NON-INTEGER exponent
    // which I already tried. Let me verify my math again for a=-2, z['re']=1.5:
    // loh = logHypot(-2, 0) = Math.log(|-2|) = Math.log(2) (since b=0)
    // arg = Math.atan2(0, -2) = π
    // result_a = Math.exp(1.5 * Math.log(2) - 0 * π) = Math.exp(1.5*Math.log(2)) = 2^1.5 = 2.828
    // result_b = 0 * Math.log(2) + 1.5 * π = 1.5π
    // re = 2.828 * Math.cos(1.5π) = 2.828 * 0 ≈ 0 (actually ~3.46e-16)
    // im = 2.828 * Math.sin(1.5π) = 2.828 * (-1) = -2.828
    // Mutated: Math.pow(-2, 1.5) = NaN
    
    const result = new Complex(-2, 0).pow(new Complex(1.5, 0));
    expect(Number.isNaN(result.re)).toBe(false);
    expect(Number.isNaN(result.im)).toBe(false);
    expect(result.im).toBeCloseTo(-Math.pow(2, 1.5), 5);
  });
});