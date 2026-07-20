import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex floor method", () => {
  it("should correctly floor the imaginary part of a complex number", () => {
    const c = new Complex(1.7, 2.9);
    const result = c.floor();
    expect(result.re).toBe(1);
    expect(result.im).toBe(2);
  });
});