import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acot", () => {
  it("should return the correct arctangent of 1/z for a real number", () => {
    const c = new Complex(1, 0);
    const result = c.acot();
    // acot(1) = atan(1/1) = atan(1) = π/4
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});