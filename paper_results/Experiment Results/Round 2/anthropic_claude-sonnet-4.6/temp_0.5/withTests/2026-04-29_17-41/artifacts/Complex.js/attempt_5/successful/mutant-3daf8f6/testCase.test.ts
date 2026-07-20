import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary", () => {
  it("log with re=3000 uses correct branch", () => {
    // Try many b values to find one where the two branches differ
    let found = false;
    for (let i = 1; i <= 2999; i++) {
      const b = i;
      const ifBranch = Math.log(3000 * 3000 + b * b) * 0.5;
      const elseBranch = 0.5 * Math.log(1500 * 1500 + (b/2) * (b/2)) + Math.LN2;
      if (ifBranch !== elseBranch) {
        // Found a value where branches differ
        const result = new Complex(3000, b).log().re;
        expect(result).toBe(elseBranch);
        found = true;
        break;
      }
    }
    // If no difference found, the mutation might be equivalent
    // But the problem guarantees it's killable, so we should find a difference
    if (!found) {
      // Fallback: just check b=1
      const result = new Complex(3000, 1).log().re;
      const elseBranch = 0.5 * Math.log(1500 * 1500 + 0.5 * 0.5) + Math.LN2;
      expect(result).toBe(elseBranch);
    }
  });
});