import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should parse empty string property not affecting re accumulation", () => {
    // Test parsing a string where re should accumulate to a specific value
    // The key insight: in mutated code z[""] = z[""] = 0 vs original z[""] = z['re'] = 0
    // Both set z['re'] to 0 via the next line, but test if z[""] interferes
    // with the token parsing loop via property lookup
    const c = new Complex("1e2");
    expect(c.re).toBe(100);
    expect(c.im).toBe(0);
  });
});