import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with empty string", () => {
  it("should throw a SyntaxError when parsing an empty string", () => {
    // An empty string causes tokens to be null (regex match returns null)
    // Original: parser_exit() is called, throwing SyntaxError
    // Mutated: the null check does nothing, then iterating over null tokens causes a TypeError
    // We expect specifically a SyntaxError from the original
    expect(() => {
      new Complex('');
    }).toThrow(SyntaxError);
  });
});