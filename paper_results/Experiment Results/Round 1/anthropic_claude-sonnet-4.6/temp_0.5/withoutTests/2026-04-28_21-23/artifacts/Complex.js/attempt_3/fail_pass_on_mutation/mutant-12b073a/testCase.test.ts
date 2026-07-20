import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh method", () => {
  it("should return correct sinh value for real input x=2", () => {
    // The Complex sinh method computes: sinh(a)*cos(b) + i*cosh(a)*sin(b)
    // For z = 2 (real), b=0: result = sinh(2) + 0i
    // Original local sinh(2) = (e^2 - e^-2) * 0.5 ≈ 3.6268604078
    // Mutated local sinh(2) = (e^2 - e^-2) / 0.5 ≈ 14.5074416313
    const c = new Complex(2, 0);
    const result = c.sinh();
    
    expect(result.re).toBeCloseTo(3.6268604078470186, 5);
    expect(result.im).toBeCloseTo(0, 10);
  });
});