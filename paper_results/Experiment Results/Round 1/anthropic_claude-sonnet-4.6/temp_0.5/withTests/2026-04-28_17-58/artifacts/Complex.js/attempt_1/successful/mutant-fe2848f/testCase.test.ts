import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for a complex number with a > 1 and non-zero imaginary part", () => {
    // For z = 2 + i:
    // Original: noIM = (2 > 1 && 1 === 0) = false, so im is NOT negated
    // Mutated:  noIM = (2 > 1 || 1 === 0) = true,  so im IS negated (wrong)
    const z = new Complex(2, 1);
    const result = z.atanh();
    
    // The correct value of atanh(2+i) can be computed mathematically
    // atanh(z) = (log(1+z) - log(1-z)) / 2
    // Expected: re ≈ 0.4023594781085251, im ≈ 1.3389725222944935
    expect(result.re).toBeCloseTo(0.4023594781085251, 10);
    expect(result.im).toBeCloseTo(1.3389725222944935, 10);
  });
});