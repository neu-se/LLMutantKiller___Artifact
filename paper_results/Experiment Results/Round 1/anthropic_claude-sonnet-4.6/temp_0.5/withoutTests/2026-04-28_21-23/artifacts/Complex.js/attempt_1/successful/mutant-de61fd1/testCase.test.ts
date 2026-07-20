import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute sech of a real number", () => {
    // sech(1) = 2 / (e^1 + e^-1) = 1 / cosh(1)
    // For real input a=1, b=0:
    // d = cos(0) + cosh(2) = 1 + cosh(2) (original)
    // d = cos(0) - cosh(2) = 1 - cosh(2) (mutated)
    // sech(1) real part = 2 * cosh(1) * cos(0) / d = 2 * cosh(1) / d
    // Expected: 1 / cosh(1) ≈ 0.6480542736638853
    const result = new Complex(1, 0).sech();
    const expected = 1 / Math.cosh(1);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});