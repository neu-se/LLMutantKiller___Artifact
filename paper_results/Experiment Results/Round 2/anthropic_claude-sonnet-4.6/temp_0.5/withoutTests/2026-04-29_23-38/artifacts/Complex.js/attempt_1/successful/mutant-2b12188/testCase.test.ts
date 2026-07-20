import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh of a real number greater than 1", () => {
    // acosh(2) should be approximately 1.3169578969248166 + 0i
    const result = new Complex(2, 0).acosh();
    
    // The expected value of acosh(2) is ln(2 + sqrt(3)) ≈ 1.3169578969248166
    const expected = Math.log(2 + Math.sqrt(3));
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});