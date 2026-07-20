import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should compute atanh of a pure imaginary number with correct sign on imaginary part", () => {
    // For atanh(bi), the result should be i*atan(b)
    // atanh(0.5i) should equal i*atan(0.5) ≈ 0.4636...i
    // The mutation sets noIM = true always, which negates im when it shouldn't
    // Original: noIM = a > 1 && b === 0, so for (0, 0.5), noIM = false, im stays positive
    // Mutated: noIM = true always, so im gets negated to negative
    const result = new Complex(0, 0.5).atanh();
    
    // Real part should be 0
    expect(result.re).toBeCloseTo(0, 10);
    
    // Imaginary part should be atan(0.5) ≈ 0.4636476090008172 (positive)
    expect(result.im).toBeCloseTo(Math.atan(0.5), 10);
    expect(result.im).toBeGreaterThan(0);
  });
});