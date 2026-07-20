import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline character", () => {
  it("should parse string with only a newline-separated real number correctly", () => {
    // Token sequence for "3\n" would be: "3", "\n"
    // Original: "3" parsed as re=3, "\n" skipped → re=3, im=0
    // Mutated: "3" parsed as re=3, plus=minus=0 after parsing "3"
    //          "\n" hits else: plus+minus===0 → parser_exit() throws SyntaxError
    expect(() => {
      const c = new Complex("3\n");
      expect(c.re).toBe(3);
    }).not.toThrow();
  });
});