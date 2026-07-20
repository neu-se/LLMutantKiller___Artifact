import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex atanh mutation detection', () => {
  it('should compute atanh(-2) with correct positive imaginary part', () => {
    const result = new Complex(-2, 0).atanh();
    // For real a < -1, atanh should have imaginary part +π/2
    // Original: noIM = (-2 > 1 && 0 === 0) = false, so im is NOT negated → +π/2
    // Mutated: noIM = (-2 > 1 || 0 === 0) = true, so im IS negated → -π/2
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeGreaterThan(0);
  });
});