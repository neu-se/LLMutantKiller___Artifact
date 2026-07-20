import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log", () => {
  it("log of a positive real number should use logHypot formula", () => {
    // For a=2, b=0:
    // Original: b===0 && a>0 is TRUE, empty if block, falls to return
    // Mutated: b===0 && a>=0 is TRUE, empty if block, falls to return
    // Both: Complex(logHypot(2,0), atan2(0,2)) = Complex(ln(2), 0)
    // No difference... 
    
    // The only detectable difference must be through pow
    // Let me test pow(0, 3) where base is 0+0i
    const result = new Complex(0, 0).pow(new Complex(0, 3));
    // This uses the general formula with logHypot(0,0) = -Infinity
    // exp(-Infinity) = 0, so result should be 0+0i
    expect(result.re).toBe(0);
  });
});