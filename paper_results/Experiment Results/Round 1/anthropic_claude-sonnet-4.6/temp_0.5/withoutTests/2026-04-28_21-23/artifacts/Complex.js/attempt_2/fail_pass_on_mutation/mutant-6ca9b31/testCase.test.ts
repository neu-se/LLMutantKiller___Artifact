import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex clone", () => {
  it("should clone a complex number preserving both real and imaginary parts", () => {
    const c = new Complex(3, 5);
    const cloned = c.clone();
    expect(cloned.re).toBe(3);
    expect(cloned.im).toBe(5);
  });
});