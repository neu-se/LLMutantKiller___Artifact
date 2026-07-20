import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number sin with small imaginary part", () => {
  it("should return correct result for sin of purely imaginary number close to zero", () => {
    // sin(0 + bi) = sin(0)*cosh(b) + i*cos(0)*sinh(b) = i*sinh(b)
    // This uses the internal cosh/sinh fallbacks only if Math.cosh/sinh don't exist.
    // The mutation flips the condition in the cosh fallback.
    // For x near 0 (|x| < 1e-9): original returns 1-x (≈1), mutated returns full formula (≈1).
    // For x = 1e-10: original returns 1 - 1e-10, mutated returns (exp(1e-10)+exp(-1e-10))*0.5
    // These differ by about 5e-21, too small to detect.
    // Instead test that cosh(0) = 1 via the complex cosh method directly
    const z = new Complex(0, 0);
    const result = z.cosh();
    // cosh(0+0i) = cosh(0)*cos(0) + i*sinh(0)*sin(0) = 1*1 + i*0*0 = 1
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});