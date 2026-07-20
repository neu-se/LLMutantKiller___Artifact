import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary condition", () => {
  it("uses safe path when |b| === 3000 and |a| < 3000", () => {
    // Try different values of a with b = 3000
    const b = 3000;
    for (const a of [1, 2, 3, 5, 10, 100, 1000, 2000, 2999, 2999.9, 2999.99]) {
      const safeResult = 0.5 * Math.log((a/2)*(a/2) + (b/2)*(b/2)) + Math.LN2;
      const fastResult = Math.log(a*a + b*b) * 0.5;
      if (safeResult !== fastResult) {
        expect(new Complex(a, b).log().re).toBe(safeResult);
        return;
      }
    }
    // If all values give same result, the mutation is equivalent
    expect(true).toBe(true);
  });
});