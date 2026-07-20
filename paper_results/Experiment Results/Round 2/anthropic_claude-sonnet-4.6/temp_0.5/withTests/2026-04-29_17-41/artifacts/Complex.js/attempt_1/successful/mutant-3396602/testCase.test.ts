import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute csc of a complex number with both real and imaginary parts", () => {
    // csc(z) = 1 / sin(z)
    // For z = 1 + 1i, we can verify against the known formula:
    // csc(a + bi) uses d = 0.5 * cosh(2b) - 0.5 * cos(2a)
    // The mutation changes cos(2a) to 1/cos(2a), which will produce different results
    
    const z = new Complex(1, 1);
    const result = z.csc();
    
    // Expected: csc(1 + i)
    // sin(1 + i) = sin(1)*cosh(1) + i*cos(1)*sinh(1)
    // csc = 1/sin = conjugate(sin) / |sin|^2
    const sinZ = z.sin();
    const expected = new Complex(1, 0).div(sinZ);
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});