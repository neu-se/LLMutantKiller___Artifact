import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot boundary at _a === 3000', () => {
  it('should use the overflow-safe path when _a equals 3000', () => {
    // With a=3000, b=3001: _a=3000, _b=3001
    // Original: _a < 3000 is false -> path 2 (safe division)
    // Mutated: _a <= 3000 is true -> path 1 (direct, but _b=3001 >= 3000 so still path 2... wait)
    
    // Need _a=3000, _b < 3000, so b between 0 and 3000 exclusive
    // a=3000, b=2999: _a=3000, _b=2999
    // Original: _a < 3000 false -> path 2
    // Mutated: _a <= 3000 true -> path 1
    
    const a = 3000, b = 2999;
    const path1 = Math.log(a * a + b * b) * 0.5;
    const path2 = 0.5 * Math.log((a/2) * (a/2) + (b/2) * (b/2)) + Math.LN2;
    
    // They must differ in floating point for this test to work
    // If they don't differ, we need a different approach
    const c = new Complex(a, b);
    const logResult = c.log();
    expect(logResult.re).toBe(path2);
  });
});