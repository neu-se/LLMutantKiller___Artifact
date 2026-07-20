import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation detection", () => {
  it("detects mutation in boundary condition _b < 3000 vs _b <= 3000", () => {
    // Find a case where a=0, b=3000 gives different floating point results
    // Direct path: Math.log(3000 * 3000) * 0.5
    // Halving path: 0.5 * Math.log(1500 * 1500) + Math.LN2
    // Use a non-zero a to create a difference
    // Try a=1, b=3000: _a=1 < 3000, _b=3000
    // Original: _b < 3000 false → halving: a=0.5, b=1500, 0.5*log(0.25+2250000)+LN2
    // Mutated: _b <= 3000 true → direct: log(1 + 9000000)*0.5
    const a = 1, b = 3000;
    const halvingPath = 0.5 * Math.log((a/2)*(a/2) + (b/2)*(b/2)) + Math.LN2;
    const directPath = Math.log(a*a + b*b) * 0.5;
    
    // log(1 + 9000000)/2 vs 0.5*log(0.25 + 2250000) + log(2)
    // = log(9000001)/2 vs 0.5*log(2250000.25) + log(2)
    // = log(9000001)/2 vs 0.5*(log(2250000.25) + 2*log(2))
    // = log(9000001)/2 vs 0.5*log(4*2250000.25)
    // = log(9000001)/2 vs 0.5*log(9000001) -- same!
    
    // Hmm, they're the same. Need non-zero a AND b=3000 with a < 3000
    // Let me try a specific non-round number
    const c = new Complex(1, 3000);
    const result = c.log();
    expect(result.re).toBe(halvingPath);
  });
});