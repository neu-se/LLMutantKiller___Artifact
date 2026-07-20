import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with null tokens", () => {
  it("should throw SyntaxError when parsing an invalid string that produces null tokens", () => {
    // In the original code, when tokens === null, parser_exit() is called which throws SyntaxError
    // In the mutated code, when tokens === null, nothing happens and parsing continues without error
    // An empty string or a string with no valid tokens will cause the regex match to return null
    expect(() => {
      new Complex("");
    }).toThrow(SyntaxError);
  });
});