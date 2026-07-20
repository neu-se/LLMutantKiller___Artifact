import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a complex number with non-zero imaginary part", () => {
    // acoth(2 + i): a=2, b=1, d=5
    // Original uses -b/d = -1/5 = -0.2 as imaginary part before atanh
    // Mutated uses -b*d = -1*5 = -5 as imaginary part before atanh
    const result = new Complex(2, 1).acoth();
    
    // The correct value of acoth(2+i) can be computed as atanh(1/(2+i)) = atanh((2-i)/5) = atanh(0.4 - 0.2i)
    // Expected: re ≈ 0.4023594781085251, im ≈ -0.22907268296853878
    expect(result.re).toBeCloseTo(0.4023594781085251, 10);
    expect(result.im).toBeCloseTo(-0.22907268296853878, 10);
  });
});