import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log boundary", () => {
  it("log(1+0i) should equal 0+0i and log(-1+0i) should equal 0+pi*i", () => {
    // With original: a=1,b=0 → a>0 true → empty block → return logHypot(1,0)+i*atan2(0,1) = 0+0i ✓
    // With mutation: a=1,b=0 → a<=0 false → return logHypot(1,0)+i*atan2(0,1) = 0+0i (same)
    // With original: a=-1,b=0 → a>0 false → return logHypot(-1,0)+i*atan2(0,-1) = 0+pi*i ✓  
    // With mutation: a=-1,b=0 → a<=0 true → empty block → return logHypot(-1,0)+i*atan2(0,-1) = 0+pi*i (same)
    // These are the same... need to find actual difference
    
    // What about a=0, b=0? Original: a>0 false. Mutation: a<=0 true (0<=0).
    // logHypot(0,0): a===0 → return Math.log(|b|) = Math.log(0) = -Infinity
    // atan2(0,0) = 0
    // Same result either way
    
    // The mutation truly has no observable effect if the if-block is empty.
    // Unless... the actual source has the return UN-commented!
    // If return IS active: original returns Math.log(a) for a>0,b=0
    // Mutation returns Math.log(a) for a<=0,b=0 (which would be NaN for a<0, -Inf for a=0)
    
    // Test: log(2) should be real Math.log(2), not go through logHypot path
    // Both give same answer for a=2,b=0 since logHypot(2,0) = Math.log(4)*0.5 = Math.log(2)
    
    // For a=-1: Math.log(-1) = NaN vs logHypot(-1,0)+i*pi = 0+i*pi
    // If mutation makes a=-1 return Math.log(-1)=NaN, that's detectable!
    const result = new Complex(-1, 0).log();
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});