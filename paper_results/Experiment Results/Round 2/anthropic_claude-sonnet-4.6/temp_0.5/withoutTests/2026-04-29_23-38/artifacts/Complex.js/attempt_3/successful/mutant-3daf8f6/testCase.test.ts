import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot mutation detection', () => {
  it('detects boundary condition change at _a === 3000', () => {
    // Find a case where path1 and path2 differ
    // path1: Math.log(a*a + b*b) * 0.5
    // path2: 0.5 * Math.log((a/2)*(a/2) + (b/2)*(b/2)) + Math.LN2
    // These are mathematically equal but may differ in floating point
    
    // Try many b values to find one where they differ
    const a = 3000;
    for (let b = 1; b < 3000; b++) {
      const p1 = Math.log(a * a + b * b) * 0.5;
      const p2 = 0.5 * Math.log((a/2)*(a/2) + (b/2)*(b/2)) + Math.LN2;
      if (p1 !== p2) {
        // Found a differing case - use it
        const c = new Complex(a, b);
        const result = c.log();
        expect(result.re).toBe(p2); // original uses path2
        return;
      }
    }
    // If no difference found, the test is inconclusive
    throw new Error('No floating point difference found');
  });
});