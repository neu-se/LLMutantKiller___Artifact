import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN detection", () => {
  it("should identify as NaN when only real part is NaN", () => {
    const c = new Complex(NaN, 5);
    expect(c.isNaN()).toBe(true);
  });
});