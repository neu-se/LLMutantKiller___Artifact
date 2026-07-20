import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline character", () => {
  it("should correctly parse a complex number string containing a newline character", () => {
    // The mutation changes the condition from checking '\n' to 'false',
    // meaning newline characters will no longer be treated as whitespace/ignored.
    // Instead, they'll fall through to the else branch which calls parser_exit()
    // for unrecognized characters.
    const c = new Complex("3\n+4i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});