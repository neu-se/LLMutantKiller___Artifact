import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex ceil method", () => {
  it("should return a new Complex number with ceiling applied to both real and imaginary parts", () => {
    const c = new Complex(1.3, 2.7);
    const result = c.ceil();
    expect(result).toBeDefined();
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
  });
});