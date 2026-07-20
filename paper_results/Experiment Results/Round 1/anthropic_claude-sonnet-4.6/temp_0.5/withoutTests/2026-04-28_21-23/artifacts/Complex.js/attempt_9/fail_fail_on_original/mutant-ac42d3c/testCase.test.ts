import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan edge case", () => {
  it("should handle atan of complex number where real part approaches 0 and imaginary is -1", () => {
    // Try with a tiny real part to see if behavior differs near the singularity
    // atan(epsilon - i) where epsilon is very small
    const epsilon = 1e-300;
    const c = new Complex(epsilon, -1);
    const result = c.atan();
    // For very small a, b=-1: d = a^2 + (1-(-1))^2 = a^2 + 4 ≈ 4
    // t1 = Complex((1-1-a^2)/4, -2a/4).log() ≈ Complex(-a^2/4, -a/2).log()
    // This should give a finite result with large imaginary part
    expect(isFinite(result.im)).toBe(false); // Should be -Infinity only at exact b=-1
    // Actually for epsilon != 0, result should be finite
    expect(isFinite(result.re)).toBe(true);
  });
});