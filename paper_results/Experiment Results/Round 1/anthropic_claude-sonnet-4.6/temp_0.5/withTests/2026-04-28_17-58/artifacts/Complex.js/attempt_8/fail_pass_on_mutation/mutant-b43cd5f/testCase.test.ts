import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline", () => {
  it("should parse complex number from string containing newline character as whitespace", () => {
    // Directly test if \n appears as a token by constructing input carefully
    // The regex alternation |. at end - test empirically what happens
    const newlineStr = "1\n+\n2i";
    // If \n IS captured as token: original skips it (whitespace branch), mutated throws
    // If \n is NOT captured: both behave same
    // Let's test the actual behavior difference with the minus counter
    // When whitespace is seen, plus/minus counters are NOT reset
    // A '\n' between '-' signs: "1 - \n 2i" 
    const c = new Complex("1 -\n 2i");
    expect(c.re).toBe(1);
    expect(c.im).toBe(-2);
  });
});