import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh of a real number less than -1", () => {
    // acosh(-2) should give a complex result with positive real part and imaginary part = π
    // The result should be approximately ln(2 + sqrt(3)) + πi ≈ 1.3169578969 + πi
    const result = new Complex(-2, 0).acosh();
    
    // The real part should be approximately 1.3169578969248168
    const expectedRe = Math.log(2 + Math.sqrt(3));
    // The imaginary part should be π
    const expectedIm = Math.PI;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});