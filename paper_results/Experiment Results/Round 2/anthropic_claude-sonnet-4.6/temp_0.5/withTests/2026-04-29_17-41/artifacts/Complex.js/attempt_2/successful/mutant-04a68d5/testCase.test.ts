import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech", () => {
  it("should correctly compute sech of a real number", () => {
    // sech(1) = 1/cosh(1) ≈ 0.6480542736638853
    const c = new Complex(1, 0);
    const result = c.sech();
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(0.6480542736638853, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});