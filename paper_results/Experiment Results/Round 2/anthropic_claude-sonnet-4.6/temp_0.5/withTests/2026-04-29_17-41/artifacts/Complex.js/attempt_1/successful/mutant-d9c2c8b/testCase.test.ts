import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a complex number with non-zero imaginary part", () => {
    // atanh(0.5 + 0.5i) should have a specific imaginary part
    // The mutation changes division by 2 to multiplication by 2 in the imaginary part calculation
    const z = new Complex(0.5, 0.5);
    const result = z.atanh();
    
    // Expected value computed from the correct formula:
    // atanh(0.5 + 0.5i) ≈ 0.4023594781085251 + 0.5535743588970452i
    const expectedRe = 0.4023594781085251;
    const expectedIm = 0.5535743588970452;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});