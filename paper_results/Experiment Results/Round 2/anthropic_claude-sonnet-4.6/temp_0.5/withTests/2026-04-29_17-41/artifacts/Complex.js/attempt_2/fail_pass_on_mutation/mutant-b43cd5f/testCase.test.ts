import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline whitespace", () => {
  it("should parse a complex number string that contains a newline character without throwing", () => {
    // In the original code, '\n' is treated as whitespace and skipped.
    // In the mutated code, '\n' is not recognized as whitespace, causing parser_exit() to throw.
    expect(() => {
      const c = new Complex("3+\n2i");
      expect(c.re).toBeCloseTo(3);
      expect(c.im).toBeCloseTo(2);
    }).not.toThrow();
  });
});