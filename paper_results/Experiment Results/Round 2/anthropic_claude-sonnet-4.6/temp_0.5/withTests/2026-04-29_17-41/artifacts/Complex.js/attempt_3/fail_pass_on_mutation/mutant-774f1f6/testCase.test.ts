import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number parsing", () => {
  it("should correctly parse string with only imaginary part", () => {
    // Testing string parsing where re should be 0
    // In string case: z['im'] = z['re'] = 0 is set at start of string parsing
    // The mutation z[""] = z['im'] = 0 would leave z['re'] at its previous value
    // But z starts fresh each parse call...
    // Let's try: the string branch sets z['im'] = /* void */ z['re'] = 0
    // With mutation on the null branch, string branch is unaffected
    // Need to find the ACTUAL location of the placeholder
    const c = new Complex("i");
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
  });
});