import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing equivalence check", () => {
  it("should parse basic complex number strings correctly", () => {
    // Since the regex dot doesn't match newlines, the mutation on '\n' handling
    // is effectively equivalent - verify normal parsing still works
    const c = new Complex("3+4i");
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
    expect(new Complex("3+4i").equals(new Complex("3+4i"))).toBe(true);
    // Tab character IS matched by '.' in regex (tabs are not newlines)
    // So test tab handling which IS affected differently
    const c2 = new Complex("3\t+\t4i");
    expect(c2.re).toBe(3);
    expect(c2.im).toBe(4);
  });
});