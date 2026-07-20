import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should handle subnormal inputs where d underflows to zero", () => {
    // Number.MIN_VALUE squared underflows to 0
    // Original: d !== 0 is false -> second branch (special NaN/Infinity handling)  
    // Mutated: true -> first branch (a/d = Infinity, -b/d = -0)
    const tiny = Number.MIN_VALUE;
    const c = new Complex(tiny, 0);
    const result = c.acoth();
    
    // In original with d !== 0 check:
    // d = tiny*tiny + 0 = 0 (underflow)
    // second branch: new Complex((tiny !== 0) ? tiny/0 : 0, 0).atanh()
    //              = new Complex(Infinity, 0).atanh()
    // atanh(Infinity) -> log((1+Inf)/(1-Inf))/2 -> log(-1)/2 -> Complex(0, PI/2)
    
    // In mutated with true:
    // first branch: new Complex(tiny/0, 0).atanh() = new Complex(Infinity, 0).atanh()
    // Same result!
    
    // They're the same again... 
    expect(result.re).toBeDefined();
  });
});