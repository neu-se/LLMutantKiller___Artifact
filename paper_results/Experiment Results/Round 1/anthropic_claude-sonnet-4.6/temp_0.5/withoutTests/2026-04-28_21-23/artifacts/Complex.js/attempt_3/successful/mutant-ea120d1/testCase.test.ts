import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary", () => {
  it("uses correct path at _b = 3000 boundary", () => {
    // Try to find a value where the two paths give different floating-point results
    let testPassed = false;
    
    for (const a of [1, 3, 7, 11, 13, 17, 19, 23, Math.PI, Math.E, 2999]) {
      const b = 3000;
      const ah = a / 2, bh = b / 2;
      const divisionPath = 0.5 * Math.log(ah * ah + bh * bh) + Math.LN2;
      const directPath = Math.log(a * a + b * b) * 0.5;
      
      if (divisionPath !== directPath) {
        const result = new Complex(a, b).log().re;
        expect(result).toBe(divisionPath); // original uses division path
        testPassed = true;
        break;
      }
    }
    
    // If no floating-point difference found, verify the behavior is consistent
    // with the division path for a=1, b=3000
    if (!testPassed) {
      const a = 1, b = 3000;
      const ah = a / 2, bh = b / 2;
      const divisionPath = 0.5 * Math.log(ah * ah + bh * bh) + Math.LN2;
      const result = new Complex(a, b).log().re;
      expect(result).toBe(divisionPath);
    }
  });
});