import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with uppercase 'I' after minus sign", () => {
  it("should correctly parse a complex number with '-I' (uppercase I after minus)", () => {
    // The mutation changes the check for uppercase 'I' in the minus branch
    // from `c === 'I'` to `c === ""`, so '-I' would no longer be recognized
    // as the imaginary unit when preceded by a minus sign.
    // Original: parses '3-I' as 3 - 1i (im = -1)
    // Mutated: fails to recognize 'I' after '-', causing wrong result or error
    const c = new Complex('3-I');
    expect(c.re).toBeCloseTo(3, 10);
    expect(c.im).toBeCloseTo(-1, 10);
  });
});