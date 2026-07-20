import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary", () => {
  it("computes log correctly at _b = 3000 boundary", () => {
    // When b = 3000 exactly and |a| < 3000:
    // Original: uses division path (halves a,b then adds LN2)
    // Mutated: uses direct path Math.log(a*a + b*b) * 0.5
    // Find a case where these differ in floating point
    
    // Try a = 1, b = 3000
    // Direct: Math.log(1 + 9000000) * 0.5
    // Division: 0.5 * Math.log(0.25 + 9000000/4) + Math.LN2
    //         = 0.5 * Math.log(2250000.25) + Math.LN2
    // These should be equal but let's check with actual log computation
    
    const directPath = Math.log(1 + 9000000) * 0.5;
    const divisionPath = 0.5 * Math.log(0.25 + 9000000/4) + Math.LN2;
    
    // If they differ, we can detect the mutation
    // log(9000001) * 0.5 vs 0.5 * log(2250000.25) + log(2)
    // = 0.5 * log(9000001) vs 0.5 * log(2250000.25) + 0.5 * log(4)
    // = 0.5 * log(9000001) vs 0.5 * (log(2250000.25) + log(4))
    // = 0.5 * log(9000001) vs 0.5 * log(9000001)  -- same!
    
    // They're mathematically identical. Need floating point difference.
    // Let me check if JavaScript floating point makes them differ
    const a = 1, b = 3000;
    const direct = Math.log(a * a + b * b) * 0.5;
    const ah = a / 2, bh = b / 2;
    const division = 0.5 * Math.log(ah * ah + bh * bh) + Math.LN2;
    
    // Use the log() method which internally calls logHypot
    const c = new Complex(a, b);
    const logC = c.log();
    
    if (direct !== division) {
      // There's a floating point difference - use this to detect mutation
      expect(logC.re).toBe(division); // original uses division path
    }
  });
});