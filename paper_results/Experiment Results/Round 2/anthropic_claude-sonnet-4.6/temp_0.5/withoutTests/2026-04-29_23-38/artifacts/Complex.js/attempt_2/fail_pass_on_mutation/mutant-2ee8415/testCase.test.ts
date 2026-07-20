import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a real number less than -1", () => {
    // acosh(-2): acos(-2) has positive imaginary part, so else branch is taken
    // Expected: acosh(-2) = log(-2 + sqrt(3)) + i*pi ≈ 1.3169578969248166 + i*pi
    const result = new Complex(-2, 0).acosh();
    
    // The real part should be approximately 1.3169578969248166
    // The imaginary part should be approximately pi
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});