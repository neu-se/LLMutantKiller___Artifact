import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline", () => {
  it("should parse string with newline-only whitespace correctly", () => {
    // '\n' alone as the entire string between meaningful tokens
    // Original: newline skipped, parses fine
    // Mutated: newline not skipped, causes parser_exit or wrong result
    expect(() => new Complex("\n1\n")).not.toThrow();
    const c = new Complex("\n1\n");
    expect(c.re).toBe(1);
    expect(c.im).toBe(0);
  });
});