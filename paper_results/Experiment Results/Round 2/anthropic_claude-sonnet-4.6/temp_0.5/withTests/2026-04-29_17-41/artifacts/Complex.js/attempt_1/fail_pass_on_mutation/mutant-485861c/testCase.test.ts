import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null/undefined parsing", () => {
  it("should return a complex number with both re and im equal to 0 when constructed with null", () => {
    const c = new Complex(null);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});