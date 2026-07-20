import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh computation", () => {
  it("should compute cosh(1) correctly using the internal cosh function via tanh", () => {
    // tanh(z) = sinh(2a)/d + i*sin(2b)/d where d = cosh(2a) + cos(2b)
    // For z = 1 (real), tanh(1) = sinh(2) / (cosh(2) + 1)
    // Original cosh(2) = (e^2 + e^-2)/2 ≈ 3.7622
    // Mutated cosh(2) = (e^2 + e^2)/2 = e^2 ≈ 7.3891
    // So tanh(1) original ≈ sinh(2)/(3.7622+1) ≈ 3.6269/4.7622 ≈ 0.7616
    // Mutated tanh(1) ≈ sinh(2)/(7.3891+1) ≈ 3.6269/8.3891 ≈ 0.4324
    
    const z = new Complex(1, 0);
    const result = z.tanh();
    
    // Math.tanh(1) is the correct answer
    expect(result.re).toBeCloseTo(Math.tanh(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});