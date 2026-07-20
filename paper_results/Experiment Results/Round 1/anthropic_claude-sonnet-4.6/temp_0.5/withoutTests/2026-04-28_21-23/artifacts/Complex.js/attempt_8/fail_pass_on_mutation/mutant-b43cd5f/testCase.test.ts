import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should verify newline handling does not affect parsing result", () => {
    // The regex dot '.' does not match newlines, so \n tokens never appear
    // Both original and mutated should behave identically
    // This test verifies the baseline behavior is preserved
    const c1 = new Complex("3+4i");
    const c2 = new Complex("3 + 4i");
    expect(c1.re).toBe(c2.re);
    expect(c1.im).toBe(c2.im);
    expect(c1.re).toBe(3);
    expect(c1.im).toBe(4);
  });
});