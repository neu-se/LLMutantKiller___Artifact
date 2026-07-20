import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of real number 0 should give correct result via atan2", () => {
    // When a=0, b=0: both versions return Complex(-Infinity, 0)
    // When a=0, b!=0: b===0 is false, same in both
    // The ONLY difference: a=0, b=0 - but block is empty
    // Let's try: does any method produce different results?
    // acos calls log - let's trace acos(1):
    // a=1, b=0: t1=Complex(0-0+1-1, -2).sqrt() = Complex(0,-2).sqrt()
    // sqrt(0-2i): r=2, a=0<=0 so re=|b|/sqrt(2*(2-0))=2/2=1, a<=0 so im=0.5*sqrt(2*(2-0))=sqrt(1)=1
    // b<0 so im=-1: sqrt = Complex(1,-1)  
    // t2 = Complex(1-0, -1+1).log() = Complex(1, 0).log()
    // log(1,0): a=1>0 (original) or a=1>=0 (mutated) - SAME empty block, returns (0,0)
    // acos(1) = Complex(pi/2 - 0, 0) = Complex(pi/2, 0)... 
    // That's wrong, acos(1) should be 0. Let me recheck.
    const result = new Complex(1, 0).acos();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});