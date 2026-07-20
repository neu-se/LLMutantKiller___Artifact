import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a real number greater than 1", () => {
    // acosh(2) should have a real result with im = 0
    const result = new Complex(2, 0).acosh();
    
    // The real part should be log(2 + sqrt(3)) ≈ 1.3169578969248166
    const expectedRe = Math.log(2 + Math.sqrt(3));
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});