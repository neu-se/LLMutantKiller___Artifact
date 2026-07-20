import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex clone and toString", () => {
  it("should preserve real part when cloning", () => {
    const c = new Complex(3, 2);
    const cloned = c.clone();
    expect(cloned.re).toBe(3);
  });
});