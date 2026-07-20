import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex", () => {
  it("should correctly initialize from null with re and im both 0", () => {
    const c = new Complex(null);
    // Force usage through multiple operations to detect any subtle difference
    expect(c.abs()).toBe(0);
    expect(c.arg()).toBe(0);
    expect(c.toString()).toBe("0");
    expect(JSON.stringify({re: c.re, im: c.im})).toBe('{"re":0,"im":0}');
  });
});