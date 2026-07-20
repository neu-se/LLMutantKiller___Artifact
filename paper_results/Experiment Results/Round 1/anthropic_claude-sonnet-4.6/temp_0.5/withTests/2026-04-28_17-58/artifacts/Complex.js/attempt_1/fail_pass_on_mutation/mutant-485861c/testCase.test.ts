import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex constructor with null/undefined input", () => {
  it("should create a complex number with re=0 and im=0 when passed null", () => {
    const c = new Complex(null);
    expect(c.re).toBe(0);
    expect(c.im).toBe(0);
  });
});