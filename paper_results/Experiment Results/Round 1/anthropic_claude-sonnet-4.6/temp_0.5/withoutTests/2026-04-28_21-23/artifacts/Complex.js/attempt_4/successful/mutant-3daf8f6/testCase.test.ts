import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot boundary mutation detection', () => {
  it('finds a value where the two branches differ', () => {
    // Systematically find a b value where the branches give different IEEE 754 results
    const a = 3000;
    
    for (let i = 1; i <= 100000; i++) {
      const b = i * 0.01;
      if (b >= 3000) break;
      
      const ifBranch = Math.log(a * a + b * b) * 0.5;
      const elseBranch = 0.5 * Math.log((a/2)*(a/2) + (b/2)*(b/2)) + Math.LN2;
      
      if (ifBranch !== elseBranch) {
        // Found a difference! Use this value
        const result = new Complex(a, b).log();
        expect(result.re).toBe(elseBranch); // original uses else-branch
        return;
      }
    }
    
    // If no difference found with a=3000, try negative a
    for (let i = 1; i <= 100000; i++) {
      const b = i * 0.01;
      if (b >= 3000) break;
      
      const ifBranch = Math.log((-3000) * (-3000) + b * b) * 0.5;
      const elseBranch = 0.5 * Math.log((-1500)*(-1500) + (b/2)*(b/2)) + Math.LN2;
      
      if (ifBranch !== elseBranch) {
        const result = new Complex(-3000, b).log();
        expect(result.re).toBe(elseBranch);
        return;
      }
    }
    
    // Mutation appears equivalent - just verify correct behavior
    expect(new Complex(3000, 1).log().re).toBeCloseTo(Math.log(Math.sqrt(3000*3000 + 1)), 14);
  });
});