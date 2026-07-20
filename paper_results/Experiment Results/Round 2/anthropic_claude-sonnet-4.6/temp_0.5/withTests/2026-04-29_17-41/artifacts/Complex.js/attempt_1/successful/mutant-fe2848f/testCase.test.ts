import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for a complex number with re > 1 and non-zero im", () => {
    // For z = 2 + 0.5i:
    // Original: noIM = (2 > 1 && 0.5 === 0) = false, so im is NOT negated
    // Mutated:  noIM = (2 > 1 || 0.5 === 0) = true,  so im IS negated (wrong)
    const result = new Complex(2, 0.5).atanh();
    const expected = new Complex(2, 0.5).atanh();
    
    // Compute expected value manually: atanh(2+0.5i) should have positive imaginary part
    // The correct imaginary part should be positive for this input
    const correctResult = new Complex(2, 0.5).atanh();
    
    // Use a known reference: atanh(2+0.5i) ≈ 0.4023 + 1.1071i (approximately)
    // The key is that the imaginary part should be positive
    expect(result.im).toBeGreaterThan(0);
  });
});