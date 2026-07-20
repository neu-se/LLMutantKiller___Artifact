import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline characters", () => {
  it("should parse a complex number string containing a newline character without throwing", () => {
    // In the original code, '\n' is treated as whitespace and skipped during parsing.
    // In the mutated code, '\n' is NOT recognized as whitespace (replaced with ""),
    // so it falls through to the else branch and triggers a SyntaxError.
    expect(() => {
      const c = new Complex("3\n+4i");
      expect(c.re).toBeCloseTo(3, 10);
      expect(c.im).toBeCloseTo(4, 10);
    }).not.toThrow();
  });
});