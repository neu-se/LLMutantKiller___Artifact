import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with plus/minus validation", () => {
  it("should throw SyntaxError when a number appears without a preceding sign in a complex string", () => {
    // The mutation changes `plus + minus === 0` to `false`, meaning the check
    // for whether a number token appears without any preceding sign operator is disabled.
    // In the original code, parsing "1 2" should throw because the second number
    // appears without a '+' or '-' preceding it (plus + minus === 0 after reset).
    expect(() => {
      new Complex("1 2");
    }).toThrow(SyntaxError);
  });
});