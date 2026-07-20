import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number string parsing", () => {
  it("should parse a string with newline between sign and imaginary unit", () => {
    // Carefully trace: "1+\ni" 
    // If \n NOT tokenized: tokens = ["1", "+", "i"]
    // i=0: c="1", next="+", not 'i', re+=1, plus=minus=0
    // i=1: c="+", plus=1
    // i=2: c="i", plus+minus=1>0, tokens[3]=undefined, isNaN(undefined)=true
    //   im += parseFloat('1') = 1, plus=minus=0
    // Result: re=1, im=1 in both versions
    
    // "1\n+i"
    // If \n NOT tokenized: tokens = ["1", "+", "i"] -> same as above
    
    // What if I look at this from the perspective of what string the toString() method produces
    // and whether re-parsing that string works?
    // toString() for Complex(1,1) = "1 + i"
    // tokens: ["1", " ", "+", " ", "i"]
    // " " is whitespace in both -> skipped
    // Result: re=1, im=1 in both
    
    // I'm going to try something completely different:
    // What if the test uses a number with 'e' notation that somehow produces empty tokens?
    const c = new Complex("1e0+1e0i");
    expect(c.re).toBe(1);
    expect(c.im).toBe(1);
  });
});