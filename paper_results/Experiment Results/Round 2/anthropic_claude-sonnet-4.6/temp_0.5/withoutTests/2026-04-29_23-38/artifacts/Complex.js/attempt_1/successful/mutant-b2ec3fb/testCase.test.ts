import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex floor method", () => {
  it("should correctly floor the real part of a complex number", () => {
    const c = new Complex(3.7, 2.5);
    const result = c.floor();
    expect(result.re).toBe(3);
    expect(result.im).toBe(2);
  });
});