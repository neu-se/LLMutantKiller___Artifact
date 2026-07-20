import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot boundary', () => {
  it('should use the overflow-safe path when _a equals exactly 3000', () => {
    // Find a b value where fast path and slow path give different IEEE 754 results
    // Fast path: Math.log(3000*3000 + b*b) * 0.5
    // Slow path: 0.5 * Math.log(1500*1500 + (b/2)*(b/2)) + Math.LN2
    // Test multiple b values to find one where they differ
    let foundDifference = false;
    let fastResult = 0;
    let slowResult = 0;
    
    for (let b = 0; b < 3000; b += 0.1) {
      const fast = Math.log(3000 * 3000 + b * b) * 0.5;
      const a2 = 3000 / 2;
      const b2 = b / 2;
      const slow = 0.5 * Math.log(a2 * a2 + b2 * b2) + Math.LN2;
      if (fast !== slow) {
        fastResult = fast;
        slowResult = slow;
        foundDifference = true;
        // Use this b value in the actual test
        const c = new Complex(3000, b);
        const result = c.log();
        expect(result.re).toBe(slowResult);
        return;
      }
    }
    
    // If no difference found, the mutation doesn't affect observable behavior
    // In that case just verify basic correctness
    const c = new Complex(3000, 0);
    const result = c.log();
    expect(result.re).toBeCloseTo(Math.log(3000), 15);
  });
});