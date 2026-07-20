import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing whitespace handling", () => {
  it("should parse complex number with tab character as whitespace", () => {
    // Testing tab character handling which is preserved in both versions
    // but ensures the whitespace branch is exercised
    const c = new Complex("3\t+\t4i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});