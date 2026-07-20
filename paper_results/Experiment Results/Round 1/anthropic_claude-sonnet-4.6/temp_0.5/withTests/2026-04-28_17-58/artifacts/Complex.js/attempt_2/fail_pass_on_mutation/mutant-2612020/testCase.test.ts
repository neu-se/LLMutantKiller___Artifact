import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing re initialization", () => {
  it("should parse a purely imaginary string with re correctly set to 0", () => {
    // The mutation changes z['re'] = 0 to z[""] = 0 in the string parser
    // This means z['re'] is not explicitly reset; we need to find a case where this matters
    // By parsing a string that only has imaginary part, re should be exactly 0
    const c = new Complex("2i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(2);
    // Now verify that re is strictly 0 and not accumulated
    const c2 = new Complex("i");
    expect(c2.re).toBe(0);
    expect(c2.im).toBe(1);
  });
});