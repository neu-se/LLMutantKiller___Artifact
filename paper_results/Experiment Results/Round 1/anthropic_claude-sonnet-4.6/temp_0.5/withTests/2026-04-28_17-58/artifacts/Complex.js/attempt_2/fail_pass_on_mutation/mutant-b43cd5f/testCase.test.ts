import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline whitespace", () => {
  it("should parse a complex number string that contains a newline character without throwing", () => {
    // Original code treats '\n' as whitespace (skips it).
    // Mutated code does NOT treat '\n' as whitespace, causing parser_exit() to throw SyntaxError.
    expect(() => {
      const c = new Complex("3\n+\n2i");
    }).not.toThrow();
  });
});