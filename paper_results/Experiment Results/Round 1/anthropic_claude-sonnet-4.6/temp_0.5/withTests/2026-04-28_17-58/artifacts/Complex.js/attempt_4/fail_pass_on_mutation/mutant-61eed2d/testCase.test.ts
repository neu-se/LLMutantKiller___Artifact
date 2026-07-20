import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing", () => {
  it("should not have an empty string property when parsed from string", () => {
    // In the original code: z['im'] = z['re'] = 0 (chained assignment, no extra properties)
    // In the mutated code: z[""] = z['re'] = 0 (sets z[""] = 0, creating an extra property)
    // The mutated code creates a Complex object with an extra "" property
    const c = new Complex("3+2i");
    expect(Object.prototype.hasOwnProperty.call(c, "")).toBe(false);
  });
});