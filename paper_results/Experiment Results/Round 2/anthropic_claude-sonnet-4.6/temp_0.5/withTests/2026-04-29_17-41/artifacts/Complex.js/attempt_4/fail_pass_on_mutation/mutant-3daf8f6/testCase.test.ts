import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation", () => {
  it("detects boundary change via log computation with re=3000, im=0.1", () => {
    const ifBranch = Math.log(3000 * 3000 + 0.1 * 0.1) * 0.5;
    const elseBranch = 0.5 * Math.log(1500 * 1500 + 0.05 * 0.05) + Math.LN2;
    // Verify these actually differ - if not, this test won't work
    const result = new Complex(3000, 0.1).log();
    expect(result.re).toBe(elseBranch);
  });
});