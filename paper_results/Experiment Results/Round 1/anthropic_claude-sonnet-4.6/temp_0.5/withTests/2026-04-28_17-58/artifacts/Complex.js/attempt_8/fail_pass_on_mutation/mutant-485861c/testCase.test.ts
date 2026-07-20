import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null/undefined handling", () => {
  it("should return 0 for valueOf when constructed with null", () => {
    const c = new Complex(null);
    expect(c.valueOf()).toBe(0);
    expect(+c).toBe(0);
  });
});