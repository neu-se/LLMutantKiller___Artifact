import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with null tokens", () => {
  it("should throw a SyntaxError when parsing an invalid string that produces null tokens", () => {
    // The mutation removes the parser_exit() call when tokens === null
    // A string that doesn't match any valid token pattern will cause tokens to be null
    // We need a string that when matched against /\d+\.?\d*e[+-]?\d|\d+\.?\d*|\.\d+|./g returns null
    // An empty string "" will produce null from match()
    expect(() => {
      new Complex("");
    }).toThrow(SyntaxError);
  });
});