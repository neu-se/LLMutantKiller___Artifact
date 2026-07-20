import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should compute the complex inverse hyperbolic sine correctly", () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    
    // asinh(1 + i) should have specific real and imaginary parts
    // The expected values are approximately: re ≈ 1.0612750619050357, im ≈ 0.6662394324925153
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(1.0612750619050357, 10);
    expect(result.im).toBeCloseTo(0.6662394324925153, 10);
  });
});