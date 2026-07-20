import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parser validation", () => {
  it("should throw SyntaxError when 'i' appears without a preceding sign context", () => {
    // In the original code, when 'i' is encountered with plus+minus===0,
    // parser_exit() is called throwing SyntaxError.
    // In the mutated code, 'if (false)' replaces this check, so no error is thrown.
    expect(() => {
      new Complex('i i');
    }).toThrow(SyntaxError);
  });
});