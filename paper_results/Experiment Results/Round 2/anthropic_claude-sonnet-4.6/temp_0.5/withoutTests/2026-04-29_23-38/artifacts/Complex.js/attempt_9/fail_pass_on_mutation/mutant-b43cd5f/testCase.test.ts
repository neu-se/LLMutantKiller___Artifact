import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with unicode line separator", () => {
  it("should handle unicode line separator U+2028 which is matched by regex dot", () => {
    // \u2028 is LINE SEPARATOR - it IS matched by regex . (unlike \n)
    // In original: only ' ', '\t', '\n' are skipped - \u2028 is NOT skipped, goes to else
    // In mutated: same behavior for \u2028
    // Both versions: \u2028 hits else branch, isNaN('\u2028') === false (coerces to 0)
    // plus+minus===0 after parsing "3" → parser_exit() throws in both versions
    // Let's try \u2028 BEFORE any number where plus=1 initially
    const c = new Complex('\u2028' + '3');
    expect(c.re).toBe(3);
    expect(c.im).toBe(0);
  });
});