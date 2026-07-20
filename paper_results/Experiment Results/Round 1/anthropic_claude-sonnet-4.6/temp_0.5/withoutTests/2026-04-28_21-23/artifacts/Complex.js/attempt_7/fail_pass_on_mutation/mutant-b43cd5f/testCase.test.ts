import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse complex number with newline as whitespace separator", () => {
    // In original: '\n' is skipped like whitespace
    // In mutated: '\n' is not skipped, isNaN('\n') is false (Number('\n')===0),
    // so '\n' gets treated as the number 0, changing the result
    // "1\n+1" - tokens: ['1', '\n', '+', '1']
    // Original: re=1, skip \n, plus++, re+=1 → re=2
    // Mutated: re=1 (plus=minus=0), '\n' with plus+minus=0 → parser_exit!
    expect(() => {
      const c = new Complex("1\n+1");
      expect(c.re).toBe(2);
    }).not.toThrow();
  });
});