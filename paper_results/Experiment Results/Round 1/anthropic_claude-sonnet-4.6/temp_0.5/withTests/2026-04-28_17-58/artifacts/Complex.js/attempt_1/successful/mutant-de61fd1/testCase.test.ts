import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute sech(1) as 1/cosh(1)", () => {
    // sech(1+0i) = 1/cosh(1) ≈ 0.6480542736638853
    // Original: d = cos(0) + cosh(2) = 1 + cosh(2), gives correct positive result
    // Mutated:  d = cos(0) - cosh(2) = 1 - cosh(2) < 0, gives wrong sign
    const result = new Complex(1, 0).sech();
    const expected = 1 / Math.cosh(1);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});