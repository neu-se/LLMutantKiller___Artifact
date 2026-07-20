import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline character", () => {
  it("should correctly parse a complex number string containing a newline character", () => {
    // The mutation changes the condition from checking '\n' to 'false',
    // meaning newline characters in complex number strings will no longer be
    // treated as whitespace/ignored, causing a parse error instead.
    const c = new Complex("3\n+2i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(2);
  });
});