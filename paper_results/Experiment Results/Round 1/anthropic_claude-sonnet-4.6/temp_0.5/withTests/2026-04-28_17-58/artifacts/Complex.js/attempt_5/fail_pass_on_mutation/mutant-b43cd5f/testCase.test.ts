import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("newline in string does not appear as token so both versions parse identically - verify basic parsing works", () => {
    // Since JS regex '.' doesn't match '\n', the '\n' mutation has no observable effect
    // Test the closest observable behavior: verify the string parser works correctly
    // with the characters that ARE affected by the whitespace branch
    const tokens = "3 + 2i".match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
    expect(tokens).toContain(' ');
    const c = new Complex("3 + 2i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(2);
  });
});