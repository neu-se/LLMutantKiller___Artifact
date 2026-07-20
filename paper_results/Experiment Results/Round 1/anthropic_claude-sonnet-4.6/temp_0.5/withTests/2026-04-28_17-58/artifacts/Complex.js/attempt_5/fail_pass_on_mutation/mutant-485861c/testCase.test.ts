import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex constructor", () => {
  it("should correctly parse a complex number after null construction showing im is properly initialized", () => {
    // Force a scenario where the chained assignment z[""] = z['im'] = 0 matters
    // In mutated code z[""] = z[""] = 0, so z['re'] might not be set via chain
    const c = new Complex(null);
    // re should be 0, not undefined
    expect(typeof c.re).toBe('number');
    expect(typeof c.im).toBe('number');
    expect(c.re + c.im).toBe(0);
  });
});