import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary condition", () => {
  it("uses halving path when imaginary part is exactly 3000", () => {
    const b = 3000;
    
    // Find a value of a where the two computation paths give different IEEE 754 results
    // Direct path: Math.log(a*a + b*b) * 0.5
    // Halving path: 0.5 * Math.log((a/2)*(a/2) + (b/2)*(b/2)) + Math.LN2
    
    // Try irrational multiples that might cause rounding differences
    const candidates = [
      Math.sqrt(2) * 1499,
      Math.sqrt(3) * 1000,
      Math.sqrt(5) * 800,
      Math.sqrt(7) * 700,
      Math.PI * 700,
      Math.E * 800,
      1 / Math.sqrt(2) * 2000,
      Math.cbrt(2) * 1500,
    ];
    
    for (const a of candidates) {
      if (a <= 0 || a >= 3000) continue;
      const direct = Math.log(a * a + b * b) * 0.5;
      const halved = 0.5 * Math.log((a / 2) * (a / 2) + (b / 2) * (b / 2)) + Math.LN2;
      if (direct !== halved) {
        expect(new Complex(a, b).log().re).toBe(halved);
        return;
      }
    }
    
    // If we get here, no difference was found - fail explicitly
    fail("Could not find a value where the two paths differ");
  });
});