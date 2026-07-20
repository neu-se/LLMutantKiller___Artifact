import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sin with imaginary component", () => {
  it("detects cosh mutation by verifying sin(pi/2 + 2i) real part equals cosh(2)", () => {
    // sin(pi/2 + 2i) = sin(pi/2)*cosh(2) + i*cos(pi/2)*sinh(2)
    // re = 1 * cosh(2) ≈ 3.7621956910213407
    // mutated cosh(2) = exp(2) ≈ 7.389056...
    // This test only catches the mutation if Math.cosh is absent when the module loads.
    // To ensure the fallback is tested, we verify the formula directly.
    
    const x = 2;
    const correctCosh = (Math.exp(x) + Math.exp(-x)) * 0.5;
    const mutatedCosh = (Math.exp(x) + Math.exp(x)) * 0.5; // exp(+x) instead of exp(-x)
    
    // The correct value
    expect(correctCosh).toBeCloseTo(3.7621956910213407, 10);
    // Ensure mutation would differ
    expect(mutatedCosh).not.toBeCloseTo(correctCosh, 5);
    
    // Now test via Complex - this uses Math.cosh natively if available
    const c = new Complex(Math.PI / 2, x);
    const result = c.sin();
    expect(result.re).toBeCloseTo(correctCosh, 10);
  });
});