import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex ceil method", () => {
  it("should return a Complex instance from ceil", () => {
    const c = new Complex(1.5, 2.5);
    const result = c.ceil();
    expect(result).toBeInstanceOf(Complex);
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
  });
});