import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with null tokens", () => {
  it("should throw a SyntaxError when parsing an invalid string that produces null tokens", () => {
    // The original code calls parser_exit() when tokens === null
    // The mutated code does nothing when tokens === null, leading to different behavior
    // A string that doesn't match the regex pattern will produce null tokens
    expect(() => {
      new Complex("@@@");
    }).toThrow(SyntaxError);
  });
});