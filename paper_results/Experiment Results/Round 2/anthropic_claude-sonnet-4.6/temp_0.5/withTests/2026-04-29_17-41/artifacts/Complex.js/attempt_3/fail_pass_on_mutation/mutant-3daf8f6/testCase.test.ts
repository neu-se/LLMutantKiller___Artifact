import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot boundary", () => {
  it("log with re=3000 uses else branch (original behavior)", () => {
    const result = new Complex(3000, 2999.5).log();
    const expectedRe = 0.5 * Math.log(1500 * 1500 + 1499.75 * 1499.75) + Math.LN2;
    expect(result.re).toBe(expectedRe);
  });
});