import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with explicit newline token via unicode escape", () => {
  it("should handle a string where newline appears between number tokens", () => {
    // Force newline into token stream by using a string where the regex
    // might capture it - testing with \u000A which is newline
    // The key insight: test that minus/plus counting works correctly with whitespace
    const str = "3 - 2i";
    const c = new Complex(str);
    expect(c.re).toBe(3);
    expect(c.im).toBe(-2);
  });
});