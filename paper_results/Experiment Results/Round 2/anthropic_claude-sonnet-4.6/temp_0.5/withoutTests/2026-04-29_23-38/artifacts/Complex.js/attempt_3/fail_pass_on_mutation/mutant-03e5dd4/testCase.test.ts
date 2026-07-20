import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse a complex number string with tab characters", () => {
    // Both original and mutated handle '\t' as whitespace
    // But the mutated version replaces '\n' check with '' check
    // A string with \n between tokens: in original \n is skipped by regex (. doesn't match \n)
    // so both behave the same for \n in strings
    // The real difference: mutated treats empty string as whitespace token
    // Test that a tab-separated complex number parses correctly
    const c = new Complex("3\t+\t4i");
    expect(c.re).toBeCloseTo(3);
    expect(c.im).toBeCloseTo(4);
  });
});