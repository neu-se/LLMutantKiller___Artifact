import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN parse", () => {
  it("should successfully create complex number when only real part is NaN", () => {
    const c = new Complex({ re: NaN, im: 5 });
    expect(c.re).toBeNaN();
    expect(c.im).toBe(5);
  });
});