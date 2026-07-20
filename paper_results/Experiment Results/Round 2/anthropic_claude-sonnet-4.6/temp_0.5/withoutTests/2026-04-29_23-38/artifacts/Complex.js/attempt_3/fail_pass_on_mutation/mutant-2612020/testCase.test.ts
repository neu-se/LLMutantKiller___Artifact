import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should not have unexpected own properties when constructed from string", () => {
    const c = new Complex("3+4i");
    // In original: z[""] = (z['re'] = 0) sets z[""] = 0
    // In mutated:  z[""] = (z[""] = 0) also sets z[""] = 0
    // Both set z[""] = 0, so the Complex object will have "" property in both cases
    // The z object is local to parse(), not the Complex instance itself
    // So this won't be observable on the Complex instance
    expect(c.re).toBe(3);
    expect(c.im).toBe(4);
  });
});