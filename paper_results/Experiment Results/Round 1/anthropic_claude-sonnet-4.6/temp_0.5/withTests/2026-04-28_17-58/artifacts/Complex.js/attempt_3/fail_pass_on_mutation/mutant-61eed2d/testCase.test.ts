import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse string with only real part and have im exactly 0 not undefined", () => {
    // The chained assignment z['im'] = z['re'] = 0 in original ensures im is 0
    // In mutated code z[""] = z['re'] = 0, im is never explicitly reset in string branch
    // Test that re is correctly reset to 0 before accumulation
    // Parse "1+1i" then check - but more importantly parse where re accumulates from 0
    const c = new Complex("1i");
    // im should be 1, re should be 0
    expect(c.re).toStrictEqual(0);
    expect(c.im).toStrictEqual(1);
    // Now test that z['re'] is properly reset - in mutated code z['re'] = 0 still runs
    // The real difference: in original, z['im'] is explicitly set via chain
    // Try parsing where we rely on im starting at 0
    const c2 = new Complex("0+0i");
    expect(c2.re).toBe(0);
    expect(c2.im).toBe(0);
    expect(Object.keys(c2)).not.toContain("");
  });
});