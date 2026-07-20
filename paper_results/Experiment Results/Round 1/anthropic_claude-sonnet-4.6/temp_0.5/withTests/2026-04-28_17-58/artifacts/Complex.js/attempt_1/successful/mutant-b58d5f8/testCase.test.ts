import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with null tokens", () => {
  it("should throw a SyntaxError when parsing an invalid string that produces null tokens", () => {
    // The mutation removes the parser_exit() call when tokens === null
    // A string that doesn't match the regex pattern will produce null tokens
    // We need to find a string that causes tokens to be null
    // The regex is: /\d+\.?\d*e[+-]?\d|\d+\.?\d*|\.\d+|./g
    // An empty string would produce null from match()
    expect(() => {
      new Complex("");
    }).toThrow(SyntaxError);
  });
});