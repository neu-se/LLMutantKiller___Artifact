import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline character", () => {
  it("should parse a complex number string that contains a newline without throwing", () => {
    // The mutation removes the '\n' check, so newline characters in strings
    // will no longer be treated as whitespace/ignored. Instead they'll hit
    // the else branch which calls parser_exit() for invalid tokens.
    expect(() => {
      const c = new Complex("3+2i\n");
      // Also verify the result is correct
      expect(c.re).toBe(3);
      expect(c.im).toBe(2);
    }).not.toThrow();
  });
});