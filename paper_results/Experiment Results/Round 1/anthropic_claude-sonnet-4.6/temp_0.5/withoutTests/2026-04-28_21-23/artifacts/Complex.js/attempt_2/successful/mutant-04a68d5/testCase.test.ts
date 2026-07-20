import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech", () => {
  it("should compute the hyperbolic secant of a real number correctly", () => {
    // sech(0) = 1
    const c = new Complex(1, 0);
    const result = c.sech();
    // sech(1) = 1/cosh(1) = 2/(e + 1/e) ≈ 0.6480542736638853
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(1 / Math.cosh(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});