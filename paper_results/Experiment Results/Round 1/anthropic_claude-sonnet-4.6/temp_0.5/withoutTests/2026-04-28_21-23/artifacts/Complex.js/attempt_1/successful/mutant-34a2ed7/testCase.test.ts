import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with plus/minus validation", () => {
  it("should throw SyntaxError when a number appears without a preceding sign in a complex string", () => {
    // The mutation changes `plus + minus === 0` to `false`, meaning the check
    // for whether a number token appears without any preceding sign operator
    // is disabled. In the original code, if plus + minus === 0 when a numeric
    // token is encountered, it throws a SyntaxError (invalid param).
    // With the mutation, this check is bypassed, so invalid strings won't throw.
    
    // A string like "3 5" has two numbers with no operator between them.
    // After parsing "3", plus and minus are reset to 0.
    // When "5" is encountered, plus + minus === 0, so original throws SyntaxError.
    // Mutated code would not throw.
    expect(() => {
      new Complex("3 5");
    }).toThrow(SyntaxError);
  });
});