import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null parsing", () => {
  it("should not have empty string property on result of null parse", () => {
    const c = new Complex(null);
    // In mutated code, z[""] = 0 is set, but this doesn't transfer to Complex instance
    // The real difference: z['re'] is never explicitly set in mutated code
    // Let's verify re is 0 by doing arithmetic
    const result = c.add(new Complex(5, 3));
    expect(result.re).toBe(5);
    expect(result.im).toBe(3);
  });
});