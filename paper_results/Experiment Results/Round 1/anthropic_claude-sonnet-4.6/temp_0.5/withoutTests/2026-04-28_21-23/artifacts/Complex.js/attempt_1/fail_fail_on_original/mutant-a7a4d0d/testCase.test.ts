import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for negative real numbers", () => {
    const result = new Complex(-2).acosh();
    // acosh(-2) should have positive real part and negative imaginary part
    // The real part should be approximately log(2 + sqrt(3)) ≈ 1.3169578969248166
    // The imaginary part should be approximately -π
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(-Math.PI, 10);
  });
});