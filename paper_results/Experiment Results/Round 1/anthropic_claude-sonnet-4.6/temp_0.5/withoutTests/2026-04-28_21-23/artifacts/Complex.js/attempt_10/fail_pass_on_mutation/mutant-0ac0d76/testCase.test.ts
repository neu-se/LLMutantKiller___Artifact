import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should place result in imaginary part for purely imaginary base 0i raised to power 1", () => {
    // Base: 0 + 0i... no, b here is this['im']
    // In pow: a = this['re'], b = this['im']
    // For new Complex(0, 0): a=0, b=0
    // b===0 && a>0: false (original) -> else if(a===0): true -> case (1%4+4)%4=1: Complex(0, Math.pow(0,1))=Complex(0,0)
    // b===0 && a<=0: true (mutated) -> Complex(Math.pow(0,1), 0) = Complex(0,0) -- same!
    
    // For new Complex(0, 3) raised to power 1: a=0, b=3
    // b===0 is FALSE (b=3) -> neither fast path taken
    // Goes to else if(a===0): case 1: Complex(0, Math.pow(3,1)) = Complex(0,3)
    // Both versions same here
    
    // The ONLY way to get different results: need b===0 (this.im===0) AND a===0 (this.re===0)
    // AND the switch case must give different result than Math.pow(0, z['re'])
    // Case 1: Complex(0, Math.pow(b,z['re'])) where b=this['im']=0 -> Complex(0,0)
    // Fast path: Complex(Math.pow(0, z['re']), 0) -> Complex(0,0)
    // Always same for a=0,b=0!
    
    // I must be wrong about where the placeholder is. Let me try the log function differently.
    // Maybe the log function's if block is NOT empty and there's actual code after the comment.
    // The placeholder shows the if line, then a commented return, then closing brace.
    // So the block IS empty. No behavioral difference possible.
    
    // Unless... the mutation is in a DIFFERENT if statement that I haven't found.
    // Let me try testing expm1 which uses cosm1:
    const result = new Complex(0, Math.PI).expm1();
    expect(result.re).toBeCloseTo(-2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});