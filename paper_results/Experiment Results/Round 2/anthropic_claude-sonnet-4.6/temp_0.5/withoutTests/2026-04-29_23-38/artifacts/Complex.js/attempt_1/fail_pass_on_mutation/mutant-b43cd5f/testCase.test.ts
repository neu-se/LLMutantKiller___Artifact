import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline character", () => {
  it("should correctly parse a complex number string containing a newline character", () => {
    // The mutation changes the condition from checking '\n' to 'false',
    // meaning newline characters in complex number strings will no longer be ignored
    // and will instead cause a SyntaxError (invalid param)
    const c = new Complex("3\n+2i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(2);
  });
});