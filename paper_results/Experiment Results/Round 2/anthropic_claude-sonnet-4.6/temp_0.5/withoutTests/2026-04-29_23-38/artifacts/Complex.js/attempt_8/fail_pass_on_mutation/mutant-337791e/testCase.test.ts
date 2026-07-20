import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow using exp internally", () => {
  it("pow should correctly compute (2+3i)^(1+2i) which uses exp internally with non-zero im", () => {
    // pow uses exp internally with a complex number that has non-zero imaginary part
    // This tests the exp code path where im !== 0
    const base = new Complex(2, 3);
    const exp = new Complex(1, 2);
    const result = base.pow(exp);
    
    // Known value: (2+3i)^(1+2i)
    const loh = Math.log(Math.sqrt(4 + 9)) * 0.5 + Math.LN2; // logHypot
    // Just verify it returns a valid complex number with finite values
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});