import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh small value branch", () => {
  it("should use the small-value approximation (1 - x) for cosh when |x| < 1e-9", () => {
    // cosh is used in sin(z) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // For b = 5e-10 (< 1e-9):
    //   original cosh(5e-10) = 1 - 5e-10 = 0.9999999995
    //   mutated  cosh(5e-10) = (exp(5e-10) + exp(-5e-10)) / 2 ≈ 1.000000000000000125
    // sin(π/2 + i*5e-10) real part = sin(π/2) * cosh(5e-10) = cosh(5e-10)
    // Original gives ~0.9999999995, mutated gives ~1.000000000000000125
    const b = 5e-10;
    const result = new Complex(Math.PI / 2, b).sin();
    // Original code: result.re should be 1 - 5e-10 = 0.9999999995
    expect(result.re).toBeLessThan(1);
  });
});