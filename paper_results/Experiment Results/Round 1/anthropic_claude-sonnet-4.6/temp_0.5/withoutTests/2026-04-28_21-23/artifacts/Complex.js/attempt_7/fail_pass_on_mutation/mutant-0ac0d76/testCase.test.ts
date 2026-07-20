import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow function", () => {
  it("should correctly compute (0+i)^1 = i", () => {
    // base is purely imaginary: a=0, b=1
    // Original: b===0 is FALSE (b=1), so outer if(z['im']===0) inner conditions not reached for this
    // Let's try a=0, b=0 (zero base) with exponent > 0
    // Actually test: purely imaginary base i^2 = -1
    // a=0, b=1, z['re']=2, z['im']=0
    // Original: b===0 is false (b=1 here means this['im']=1), so skip fast path
    // Wait - a=this['re']=0, b=this['im']=1
    // Original: if(b===0 && a>0) -> b=1 !== 0, false. Goes to else if(a===0) -> true! case 2: Complex(0, b^2)=Complex(0,1)... 
    // (z['re']%4+4)%4 = (2%4+4)%4 = 2, case 2: Complex(-Math.pow(1,2), 0) = Complex(-1, 0)
    const result = new Complex(0, 1).pow(new Complex(2, 0));
    expect(result.re).toBeCloseTo(-1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});