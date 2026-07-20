import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should correctly parse a purely imaginary string and have im initialized to 0", () => {
    // In the original code: z['im'] = z['re'] = 0 (chained assignment)
    // In the mutated code: z[""] = z['re'] = 0, so z['im'] is never reset to 0
    // For a string like "i", im should be 1
    // The difference: original resets z['im'] to 0 before parsing,
    // mutated does not reset z['im'] (it stays at initial 0 from object literal)
    // We need a case where the re-initialization matters.
    // Since z starts as {re:0, im:0}, we need to test that im gets set correctly
    // when parsing a string that only has imaginary component.
    const c = new Complex("i");
    expect(c.im).toBe(1);
    expect(c.re).toBe(0);
  });
});