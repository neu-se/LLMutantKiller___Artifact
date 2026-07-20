import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline character", () => {
  it("should parse a complex number string with a newline without throwing", () => {
    // In original code, '\n' is treated as whitespace and skipped
    // In mutated code, '\n' is not recognized as whitespace, causing a SyntaxError
    expect(() => {
      const result = new Complex("3\n+4i");
      expect(result.re).toBe(3);
      expect(result.im).toBe(4);
    }).not.toThrow();
  });
});