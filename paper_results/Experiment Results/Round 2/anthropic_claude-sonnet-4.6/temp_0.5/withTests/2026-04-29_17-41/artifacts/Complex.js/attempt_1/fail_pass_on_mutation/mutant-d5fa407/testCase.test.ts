import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot mutation test", () => {
  it("should compute acot correctly for a pure imaginary number where b is non-zero", () => {
    // For the case where d = a*a + b*b = 0, only possible when a=0 and b=0
    // The mutation changes (b !== 0) ? -b / 0 : 0 to (false) ? -b / 0 : 0
    // This means when b !== 0 in the degenerate case, the imaginary part changes
    // We test with a complex number that has b != 0 to ensure the sign handling is correct
    // acot(0 + 2i): d = 0 + 4 = 4, so goes through normal path: (0/4, -2/4).atan() = (0, -0.5).atan()
    // atan(0 - 0.5i): a=0, b=-0.5, d = 0 + (1-(-0.5))^2 = (1.5)^2 = 2.25
    // t1 = new Complex((1 - 0.25 - 0) / 2.25, -2*0*(-0.5)/2.25).log() = Complex(0.75/2.25, 0).log()
    // = Complex(1/3, 0).log() = Complex(log(1/3), 0)
    // result = new Complex(-0.5 * 0, 0.5 * log(1/3)) = Complex(0, 0.5 * log(1/3))
    // acot(0 + 2i) should have a specific imaginary part
    const result = new Complex(0, 2).acot();
    // Expected: acot(2i) = atanh(1/(2i)) ... let's just check it's finite and has correct sign
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    // The imaginary part should be negative for b=2 (positive imaginary input)
    expect(result.im).toBeLessThan(0);
    // Verify specific value: acot(2i) = i/2 * log((2i-i)/(2i+i)) = i/2 * log(1/3) = i/2 * (-log3)
    // im part = 0.5 * log(1/3) = -0.5 * log(3) ≈ -0.5493
    expect(result.im).toBeCloseTo(-Math.log(3) / 2, 10);
    expect(result.re).toBeCloseTo(0, 10);
  });
});