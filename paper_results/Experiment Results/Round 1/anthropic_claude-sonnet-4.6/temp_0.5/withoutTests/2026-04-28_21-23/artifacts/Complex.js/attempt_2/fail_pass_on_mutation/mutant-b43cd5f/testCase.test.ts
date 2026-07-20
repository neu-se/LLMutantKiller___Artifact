import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse a complex number string that contains a newline character without throwing", () => {
    // In the original code, '\n' is treated as whitespace and skipped.
    // In the mutated code, '\n' is not recognized and causes parser_exit() to throw SyntaxError.
    expect(() => {
      const c = new Complex("3+4i\n");
      expect(c.re).toBe(3);
      expect(c.im).toBe(4);
    }).not.toThrow();
  });
});