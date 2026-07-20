import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh fallback behavior", () => {
  it("should compute sin correctly for complex number with imaginary part", () => {
    // sin(a + bi) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // If cosh is broken, this will return NaN
    const c = new Complex(0, 1);
    const result = c.sin();
    // sin(i) = i*sinh(1) ≈ 1.1752011936438014i
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.sinh(1), 10);
  });
});