import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with imaginary unit 'I'", () => {
  it("should correctly parse complex numbers with uppercase 'I' as imaginary unit", () => {
    // The mutation changes `c === 'I'` to `c === ""`, so uppercase 'I' will no longer
    // be recognized as the imaginary unit in string parsing.
    // In the original: '3I' should parse as 0 + 3i (imaginary part = 3)
    // In the mutated code: '3I' will fail to parse correctly because 'I' won't be recognized
    
    const c = new Complex('3I');
    expect(c.re).toBe(0);
    expect(c.im).toBe(3);
  });
});