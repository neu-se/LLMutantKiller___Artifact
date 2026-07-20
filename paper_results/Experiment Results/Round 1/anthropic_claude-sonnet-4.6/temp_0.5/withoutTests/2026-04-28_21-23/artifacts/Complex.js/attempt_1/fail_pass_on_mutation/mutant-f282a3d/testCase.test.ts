import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with imaginary unit 'I' (uppercase)", () => {
  it("should correctly parse a complex number with uppercase 'I' as the imaginary unit", () => {
    // The mutation changes `c === 'I'` to `c === ""`, which means uppercase 'I'
    // would no longer be recognized as the imaginary unit in the string parser.
    // This test verifies that parsing '3+2I' (with uppercase I) works correctly.
    const c = new Complex('3+2I');
    expect(c.re).toBeCloseTo(3, 10);
    expect(c.im).toBeCloseTo(2, 10);
  });
});