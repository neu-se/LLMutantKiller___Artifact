import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex partial NaN detection", () => {
  it("should create complex number when only imaginary part is NaN", () => {
    const c = new Complex(5, NaN);
    expect(c.re).toBe(5);
    expect(isNaN(c.im)).toBe(true);
  });
});