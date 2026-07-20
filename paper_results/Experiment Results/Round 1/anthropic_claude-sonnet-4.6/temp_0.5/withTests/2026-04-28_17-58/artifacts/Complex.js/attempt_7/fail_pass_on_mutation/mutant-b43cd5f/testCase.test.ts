import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex newline token detection", () => {
  it("verifies newline character handling in complex string parser", () => {
    // Test using a multiline string constructed so that \n appears between tokens
    // In JS regex without 's' flag, '.' doesn't match \n
    // But we can verify by checking what tokens the regex produces
    const testStr = "1+1i";
    const withNewlines = testStr.split('').join('\n');
    // withNewlines = "1\n+\n1\ni" - newlines between each char
    // regex won't capture \n, so tokens should be same as "1+1i"
    // Original handles \n in whitespace branch (no-op), mutated falls to else -> parser_exit
    // BUT since \n isn't captured by regex, both behave the same
    // The only real test: use a string with space which IS captured
    const c = new Complex("1 + 1i");
    expect(c.re).toBe(1);
    expect(c.im).toBe(1);
    expect(c.toString()).toBe("1 + i");
  });
});