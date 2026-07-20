import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh small value optimization", () => {
  it("should compute sin of a complex number with tiny imaginary part correctly", () => {
    // sin(a + i*b) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // For very small b (< 1e-9), original cosh returns 1 - b (small-value branch)
    // Mutated cosh always uses (exp(x) + exp(-x)) / 2
    // For b = 1e-10:
    //   original: cosh(1e-10) = 1 - 1e-10 = 0.9999999999
    //   mutated:  cosh(1e-10) = (exp(1e-10) + exp(-1e-10)) / 2 ≈ 1.000000000005
    // These differ by about 1e-9, which is detectable
    const b = 1e-10;
    const a = Math.PI / 4;
    const result = new Complex(a, b).sin();
    
    // With original code: re = sin(π/4) * (1 - 1e-10)
    const expectedRe = Math.sin(a) * (1 - b);
    
    expect(result.re).toBeCloseTo(expectedRe, 12);
  });
});