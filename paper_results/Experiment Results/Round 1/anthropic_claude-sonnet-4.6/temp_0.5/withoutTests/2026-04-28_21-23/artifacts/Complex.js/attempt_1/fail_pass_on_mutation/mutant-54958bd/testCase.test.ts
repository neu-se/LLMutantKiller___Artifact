import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a real number greater than 1", () => {
    // acosh(2) should give a real result approximately ln(2 + sqrt(3)) ≈ 1.3169578969248166
    const result = new Complex(2, 0).acosh();
    
    // The real part should be approximately 1.3169578969248166
    // The imaginary part should be approximately 0
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});