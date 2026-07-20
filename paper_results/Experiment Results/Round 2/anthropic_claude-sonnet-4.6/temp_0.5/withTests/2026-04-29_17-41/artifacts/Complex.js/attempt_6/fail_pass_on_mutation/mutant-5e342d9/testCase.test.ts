import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot mutation detection", () => {
  it("detects mutation via abs with large real, zero imaginary", () => {
    // hypot(4000, 0): a=4000, b=0, a >= b
    // If placeholder is only line: original b=4000/0=Inf, mutated b=4000*0=0
    // Original result: 4000*sqrt(1+Inf)=Inf (wrong)
    // Mutated result: 4000*sqrt(1+0)=4000 (correct!)
    // So original would be WRONG and mutated would be RIGHT
    // That means test passes on mutated but fails on original - opposite of what we want
    
    // What about hypot(0, 4000)? a=0, b=4000, a < b, else branch: b=y/x=4000/0=Inf
    // Both original and mutated give Inf (else branch unaffected)
    
    // What if we need a case where original gives correct answer but mutated doesn't?
    // For that, we need the placeholder to be the ONLY effective assignment
    // and original x/y gives correct ratio while x*y doesn't
    
    // For correct hypot with a>=b: need b = b_abs/a_abs = |y|/|x|
    // Original b = x/y: for x=4000,y=3000, b=4/3 (wrong ratio, should be 3/4)
    // Unless a gets reassigned to b first
    
    // I'll try the case where a=b (equal large values)
    // hypot(4000, 4000): a=4000, b=4000, a>=b
    // With a=b first: a=4000, b=x/y=4000/4000=1, result=4000*sqrt(2)=5656.85 ✓
    // Mutated: a=4000, b=x*y=16000000, result=4000*sqrt(1+256e12)≈huge ✗
    const c = new Complex(4000, 4000);
    expect(c.abs()).toBeCloseTo(4000 * Math.SQRT2, 5);
  });
});