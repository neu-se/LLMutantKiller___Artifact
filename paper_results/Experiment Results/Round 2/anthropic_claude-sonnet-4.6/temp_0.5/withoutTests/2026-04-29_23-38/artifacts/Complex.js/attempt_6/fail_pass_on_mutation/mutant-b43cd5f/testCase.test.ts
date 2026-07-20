import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with tab character", () => {
  it("should parse string with tab character as whitespace correctly", () => {
    // The mutation changes: c === ' ' || c === '\t' || c === '\n'
    // to: c === ' ' || c === '\t' || false
    // Tab '\t' is still handled in mutated code, but '\n' is not
    // However, '\n' is not matched by the regex dot (.) so we need '\t' after a number
    // After parsing a number, plus=minus=0, then '\t' is skipped (both original and mutated)
    // Let's try a tab BEFORE a sign to see if behavior differs
    // Actually the mutation only removes '\n' handling - let's find a case where '\n' token exists
    // The regex dot doesn't match '\n' by default, so '\n' won't be tokenized
    // The real difference: '\t' still works in both. Only '\n' differs, but '\n' isn't tokenized.
    // So we need to check if there's any observable difference at all...
    // Let's verify tab still works in both versions
    const c = new Complex("3\t+\t2i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(2);
  });
});