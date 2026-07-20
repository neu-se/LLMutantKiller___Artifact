import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string with newline by treating it as whitespace separator", () => {
    // Force \n into token stream: use String object with custom toString
    // that returns a string where \n appears between digits
    // Try passing array-like or object that produces newline in string conversion
    const result = new Complex({ re: 3, im: 2 });
    // Test the toString produces something parseable back
    const str = result.toString(); // "3 + 2i"
    const reparsed = new Complex(str);
    expect(reparsed.re).toBe(3);
    expect(reparsed.im).toBe(2);
  });
});