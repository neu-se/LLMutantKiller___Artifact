import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with newline character", () => {
  it("should produce a valid non-NaN result when parsing string with newline before a number", () => {
    // With mutation: '\n' token falls to else branch, parseFloat('\n') = NaN
    // gets added to re, making the result NaN
    // Original: '\n' is skipped as whitespace, result is valid
    const c = new Complex("+\n3");
    expect(isNaN(c.re)).toBe(false);
    expect(c.re).toBe(3);
    expect(c.im).toBe(0);
  });
});