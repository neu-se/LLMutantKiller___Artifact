import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh of a complex number with non-zero imaginary part", () => {
    // atanh(0 + 2i) should give a specific value
    // The mutation changes division by 2 to multiplication by 2 in the imaginary part computation
    const c = new Complex(0, 2);
    const result = c.atanh();
    
    // atanh(2i) = i * atan(2) 
    // The real part should be 0, imaginary part should be atan(2) ≈ 1.1071487177940904
    const expectedIm = Math.atan(2); // ≈ 1.1071487177940904
    
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});