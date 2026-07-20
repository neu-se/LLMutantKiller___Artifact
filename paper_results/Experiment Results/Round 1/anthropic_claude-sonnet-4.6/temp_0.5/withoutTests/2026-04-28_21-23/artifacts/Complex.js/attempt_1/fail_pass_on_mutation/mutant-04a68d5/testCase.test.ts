import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should correctly compute the inverse hyperbolic sine of a real number", () => {
    const c = new Complex(1, 0);
    const result = c.asinh();
    // asinh(1) = log(1 + sqrt(2)) ≈ 0.8813735870195430
    expect(result.re).toBeCloseTo(Math.asinh(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});