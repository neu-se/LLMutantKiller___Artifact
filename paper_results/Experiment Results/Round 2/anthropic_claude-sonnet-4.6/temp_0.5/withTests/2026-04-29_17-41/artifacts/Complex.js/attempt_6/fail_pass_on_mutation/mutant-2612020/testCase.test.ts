import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex string parsing internal state", () => {
  it("should not have an empty string property on parsed complex number", () => {
    const c = new Complex("3+2i");
    // In original: z[""] = z['re'] = 0, z[""] ends up as 0
    // In mutated: z[""] = z[""] = 0, same result
    // The parse result z is used to set this['re'] and this['im'] only
    // So the "" property never makes it to the Complex instance
    expect(Object.keys(c).filter(k => k === "")).toHaveLength(0);
  });
});