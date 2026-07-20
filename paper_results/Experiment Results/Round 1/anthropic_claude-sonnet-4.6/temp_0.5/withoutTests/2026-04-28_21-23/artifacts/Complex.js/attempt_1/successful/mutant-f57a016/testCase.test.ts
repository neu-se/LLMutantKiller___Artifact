import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing with imaginary unit", () => {
  it("should correctly parse a complex number string where a number is followed by 'I' (uppercase)", () => {
    // The mutation changes `tokens[i + 1] === 'I'` to `tokens[i + 1] === ""`
    // This means when parsing something like "3+2I", the uppercase 'I' won't be recognized
    // as indicating an imaginary part, so '2' would be treated as real instead of imaginary
    const c = new Complex("3+2I");
    expect(c.re).toBeCloseTo(3, 10);
    expect(c.im).toBeCloseTo(2, 10);
  });
});