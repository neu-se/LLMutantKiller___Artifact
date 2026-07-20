import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a real number greater than 1", () => {
    // acosh(2) should be approximately 1.3169578969248166 (real, no imaginary part)
    const result = new Complex(2, 0).acosh();
    
    // The real part should be approximately log(2 + sqrt(3)) ≈ 1.3169578969248166
    const expectedRe = Math.log(2 + Math.sqrt(3));
    const expectedIm = 0;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});