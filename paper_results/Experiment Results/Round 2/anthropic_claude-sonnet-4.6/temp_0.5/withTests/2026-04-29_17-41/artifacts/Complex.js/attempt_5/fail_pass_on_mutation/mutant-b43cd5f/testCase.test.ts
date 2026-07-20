import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline between number and operator", () => {
  it("should parse a complex number string with newline after a number without throwing", () => {
    // Tokens for "1\n+2i": ['1', '\n', '+', '2', 'i']
    // Original: after parsing '1' (plus=minus=0), '\n' is skipped as whitespace - no throw
    // Mutated: after parsing '1' (plus=minus=0), '\n' hits else branch,
    //          plus+minus===0 is true -> parser_exit() throws SyntaxError
    expect(() => new Complex("1\n+2i")).not.toThrow();
    const c = new Complex("1\n+2i");
    expect(c.re).toBe(1);
    expect(c.im).toBe(2);
  });
});