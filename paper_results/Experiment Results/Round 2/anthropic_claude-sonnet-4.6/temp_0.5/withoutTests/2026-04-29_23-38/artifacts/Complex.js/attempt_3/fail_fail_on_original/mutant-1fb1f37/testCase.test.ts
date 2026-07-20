import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosh small value approximation', () => {
  it('should use 1-x approximation for cosh when |x| < 1e-9', () => {
    const x = 5e-10;
    // cosh(x + 0i) real part = cosh(x) * cos(0) = cosh(x)
    // Original: cosh(5e-10) = 1 - 5e-10 = 0.9999999995
    // Mutated: cosh(5e-10) = (exp(5e-10)+exp(-5e-10))/2 ≈ 1
    const result = new Complex(x, 0).cosh();
    expect(result.re).toBeLessThan(1);
  });
});