import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh small value branch", () => {
  it("should correctly compute tanh for a number with tiny real part using cosh small-value branch", () => {
    // tanh(a + ib) uses cosh(2a) in denominator: d = cosh(2a) + cos(2b)
    // For a = 1e-10, b = 0: tanh(1e-10) = sinh(2e-10) / (cosh(2e-10) + 1)
    // Original cosh(2e-10) = 1 - 2e-10
    // Mutated  cosh(2e-10) = (exp(2e-10) + exp(-2e-10))/2 ≈ 1 + 2e-20
    // The difference in denominator: (1 - 2e-10 + 1) vs (1 + 2e-20 + 1)
    // This affects the result of tanh
    // More directly: test cosh via sinh function
    // sinh(a + ib) = sinh(a)*cos(b) + i*cosh(a)*sin(b)
    // For a = 0, b = 1e-10: sinh(0 + i*1e-10) = 0 + i*cosh(0)*sin(1e-10)
    // cosh(0): original = 1 - 0 = 1, mutated = 1. Same.
    
    // Use a = 1e-10, b = Math.PI/2:
    // sinh(1e-10 + i*π/2) = sinh(1e-10)*cos(π/2) + i*cosh(1e-10)*sin(π/2)
    //                     ≈ sinh(1e-10)*0 + i*cosh(1e-10)*1
    // im = cosh(1e-10)
    // Original: cosh(1e-10) = 1 - 1e-10 = 0.9999999999
    // Mutated:  cosh(1e-10) ≈ 1.000000000005e-20 ≈ 1
    const result = new Complex(1e-10, Math.PI / 2).sinh();
    // Original: im ≈ 1 - 1e-10 = 0.9999999999
    // Mutated:  im ≈ 1.0
    expect(result.im).not.toBe(1);
    expect(result.im).toBeCloseTo(1 - 1e-10, 11);
  });
});