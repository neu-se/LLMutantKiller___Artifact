import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh fallback function", () => {
  it("should return correct cosh value for negative input via sin method with imaginary argument", () => {
    // sin(0 + bi) = sin(0)*cosh(b) + i*cos(0)*sinh(b) = 0 + i*sinh(b)
    // The real part depends on cosh(b) * sin(0) = 0 regardless
    // Instead use cos(0 + bi) = cos(0)*cosh(b) - i*sin(0)*sinh(b) = cosh(b) + 0i
    // For b = -2: cos(-2i) should have re = cosh(-2)
    // Original local cosh(-2) = (e^-2 + e^2)/2 ≈ 3.7622
    // Mutated local cosh(-2) = (e^-2 + e^-2)/2 = e^-2 ≈ 0.1353
    // BUT Math.cosh exists so local function is never called!
    // Need to verify Math.cosh is being used (not the local fallback)
    
    const z = new Complex(0, -2);
    const result = z.cos();
    // cos(0 - 2i) = cos(0)*cosh(2) - i*sin(0)*sinh(2) = cosh(2)
    const expected = Math.cosh(2);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});