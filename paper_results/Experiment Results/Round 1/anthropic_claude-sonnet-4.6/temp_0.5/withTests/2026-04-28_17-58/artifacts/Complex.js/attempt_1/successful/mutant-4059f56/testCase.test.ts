import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex clone method", () => {
  it("should return a clone with the same real part as the original", () => {
    const c = new Complex(3, 4);
    const cloned = c.clone();
    expect(cloned.re).toBe(3);
    expect(cloned.im).toBe(4);
  });
});