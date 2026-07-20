import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing whitespace handling", () => {
  it("should handle tab characters as whitespace when parsing complex number strings", () => {
    // In the original: c === '\t' is checked (second condition)
    // In the mutated: c === '\t' is still checked (second condition unchanged)
    // But the mutation changes || c === '\n' to || false
    // Since \n can't appear as a token (regex . doesn't match \n),
    // we verify the tab case still works to ensure whitespace branch is intact
    const c = new Complex("5\t+\t3i");
    expect(c.re).toBe(5);
    expect(c.im).toBe(3);
    // Also verify space handling
    const c2 = new Complex("5 + 3i");
    expect(c2.re).toBe(5);
    expect(c2.im).toBe(3);
  });
});