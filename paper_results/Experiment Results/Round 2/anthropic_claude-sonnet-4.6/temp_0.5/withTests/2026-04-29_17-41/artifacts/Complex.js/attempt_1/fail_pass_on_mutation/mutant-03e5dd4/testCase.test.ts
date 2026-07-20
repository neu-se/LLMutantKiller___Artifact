import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline characters", () => {
  it("should parse a complex number string containing a newline character without throwing", () => {
    // In the original code, '\n' is treated as whitespace and skipped during parsing.
    // In the mutated code, '\n' is replaced with "" in the check, so newlines are NOT
    // recognized as whitespace, causing a SyntaxError to be thrown.
    expect(() => {
      const c = new Complex("3\n+4i");
      expect(c.re).toBeCloseTo(3, 10);
      expect(c.im).toBeCloseTo(4, 10);
    }).not.toThrow();
  });
});