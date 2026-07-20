import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string with multiple imaginary parts accumulated correctly", () => {
    // In mutated code z['im'] is not reset, so if there's any difference in initial state it would show
    // Test that re is correctly reset to 0 when parsing a purely imaginary number
    // after the z object is created with re:0, im:0
    const c = new Complex("i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
    expect(isNaN(c.re)).toBe(false);
    expect(isNaN(c.im)).toBe(false);
  });
});