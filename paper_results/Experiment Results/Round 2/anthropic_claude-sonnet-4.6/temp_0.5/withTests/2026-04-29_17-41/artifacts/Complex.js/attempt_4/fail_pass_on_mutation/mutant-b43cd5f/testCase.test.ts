import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline", () => {
  it("should parse string with newline as whitespace, not corrupting the real part", () => {
    // Original: '\n' is skipped as whitespace
    // Mutated: '\n' falls to else branch, parseFloat('\n') = NaN, so re becomes NaN
    // The string '\n5' - after newline, plus=1,minus=0 so no throw, but parseFloat('\n')=NaN
    // Actually need newline BEFORE a number so it gets parsed as the number token
    // Token sequence for '\n5': ['\n', '5']
    // Mutated: '\n' -> else branch -> parseFloat('\n')=NaN -> re=NaN
    const c = new Complex('\n5');
    expect(c.re).toBe(5);
    expect(isNaN(c.re)).toBe(false);
  });
});