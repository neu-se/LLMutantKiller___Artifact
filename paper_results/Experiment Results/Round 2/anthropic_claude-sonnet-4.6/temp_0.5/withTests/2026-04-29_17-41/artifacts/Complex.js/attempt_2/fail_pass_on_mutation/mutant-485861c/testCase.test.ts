import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex parsing with undefined input", () => {
  it("should have im equal to 0 when constructed with undefined", () => {
    const c = new Complex(undefined);
    // In mutated code, z['im'] is never explicitly set to 0 in the null/undefined branch
    // though it starts as 0, the chained assignment is broken
    // The real test: ensure the object is valid and im is 0
    expect(c.im).toBe(0);
    expect(c.re).toBe(0);
    expect(c.isZero()).toBe(true);
  });
});