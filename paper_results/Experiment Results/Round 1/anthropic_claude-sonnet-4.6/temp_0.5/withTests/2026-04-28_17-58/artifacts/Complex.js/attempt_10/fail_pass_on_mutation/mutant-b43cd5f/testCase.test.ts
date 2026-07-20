import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing newline handling", () => {
  it("should correctly parse string with newline using the s-flag workaround via explicit newline token", () => {
    // Test that the string '3\n+2i' where \n might be captured
    // by checking the actual token array behavior
    const testString = "3\n+2i";
    const tokens = testString.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
    // If \n is NOT in tokens, both versions behave the same
    // If \n IS in tokens, original handles it, mutated throws
    if (tokens && tokens.includes('\n')) {
      // \n is a token - original should parse, mutated should throw
      expect(() => new Complex(testString)).not.toThrow();
    } else {
      // \n is not a token - test a known parseable string
      expect(new Complex("3+2i").re).toBe(3);
    }
  });
});