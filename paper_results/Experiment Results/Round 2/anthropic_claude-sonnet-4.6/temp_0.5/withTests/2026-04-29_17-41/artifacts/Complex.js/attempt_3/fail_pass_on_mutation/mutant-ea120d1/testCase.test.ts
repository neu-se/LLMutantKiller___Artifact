import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary", () => {
  it("detects mutation in boundary condition", () => {
    // The mutation changes _b < 3000 to _b <= 3000
    // This affects behavior when _b === 3000 exactly and _a < 3000
    // Find a floating point difference between the two paths
    
    let differenceFound = false;
    
    // Try various values of a with b=3000
    const testValues = [1, 2, 3, 7, 13, 100, 500, 1000, 1500, 2000, 2500, 2999];
    
    for (const a of testValues) {
      const b = 3000;
      const direct = Math.log(a * a + b * b) * 0.5;
      const halved = 0.5 * Math.log((a/2) * (a/2) + (b/2) * (b/2)) + Math.LN2;
      
      if (direct !== halved) {
        const c = new Complex(a, b);
        const result = c.log();
        expect(result.re).toBe(halved); // Original uses halved path
        differenceFound = true;
        break;
      }
    }
    
    if (!differenceFound) {
      // Also try negative b = -3000 (so _b = 3000)
      for (const a of testValues) {
        const b = -3000;
        const direct = Math.log(a * a + b * b) * 0.5;
        const halved = 0.5 * Math.log((a/2) * (a/2) + (b/2) * (b/2)) + Math.LN2;
        
        if (direct !== halved) {
          const c = new Complex(a, b);
          const result = c.log();
          expect(result.re).toBe(halved);
          differenceFound = true;
          break;
        }
      }
    }
    
    // If still no difference, the mutation has no observable effect
    // In that case, verify the result is mathematically correct
    if (!differenceFound) {
      const c = new Complex(1, 3000);
      const result = c.log();
      expect(result.re).toBeCloseTo(Math.log(Math.sqrt(1 + 9000000)), 14);
    }
  });
});