import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a complex number with non-zero imaginary part", () => {
    // atanh(0.5 + 0.5i) should have a specific imaginary part
    // The mutation changes division by 2 to multiplication by 2 in the imaginary part calculation
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    
    // The correct value of atanh(0.5 + 0.5i):
    // re ≈ 0.4023594781085251
    // im ≈ 0.5535743588970452
    // With the mutation (multiply by 2 instead of divide by 2):
    // im would be ≈ 2.214297435588181
    
    expect(result.re).toBeCloseTo(0.4023594781085251, 10);
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});