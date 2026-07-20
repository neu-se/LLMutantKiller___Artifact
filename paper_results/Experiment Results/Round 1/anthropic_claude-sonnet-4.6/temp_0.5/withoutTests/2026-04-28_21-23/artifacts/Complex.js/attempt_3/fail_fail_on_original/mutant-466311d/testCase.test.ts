import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot mutation detection', () => {
  it('detects mutation in logHypot when _a >= 3000 and _b < 3000', () => {
    // With a=3001, b=1: original uses safe path, mutated uses naive path
    // Compute what each path gives
    const a = 3001, b = 1;
    const safePathResult = 0.5 * Math.log((a/2) * (a/2) + (b/2) * (b/2)) + Math.LN2;
    const naivePathResult = Math.log(a * a + b * b) * 0.5;
    
    // If they differ in floating point, our test can distinguish
    if (safePathResult !== naivePathResult) {
      const c = new Complex(a, b);
      const result = c.log();
      expect(result.re).toBe(safePathResult);
    } else {
      // Find a value where they do differ
      const a2 = 5000, b2 = 1;
      const safe2 = 0.5 * Math.log((a2/2) * (a2/2) + (b2/2) * (b2/2)) + Math.LN2;
      const naive2 = Math.log(a2 * a2 + b2 * b2) * 0.5;
      expect(safe2).not.toBe(naive2);
      const c2 = new Complex(a2, b2);
      const result2 = c2.log();
      expect(result2.re).toBe(safe2);
    }
  });
});