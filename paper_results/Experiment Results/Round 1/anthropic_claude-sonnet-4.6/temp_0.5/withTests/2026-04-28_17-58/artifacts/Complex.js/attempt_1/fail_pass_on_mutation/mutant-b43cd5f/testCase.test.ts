import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline character", () => {
  it("should correctly parse a complex number string containing a newline character", () => {
    // The mutation changes the whitespace check from:
    //   c === ' ' || c === '\t' || c === '\n'
    // to:
    //   c === ' ' || c === '\t' || false
    // This means newline characters '\n' are no longer treated as whitespace/ignored,
    // causing a parser error when a newline is present in the string.
    
    const result = new Complex("3\n+2i");
    expect(result.re).toBe(3);
    expect(result.im).toBe(2);
  });
});