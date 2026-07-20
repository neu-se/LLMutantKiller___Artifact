import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a real number greater than 1", () => {
    // acosh(2) should be approximately 1.3169578969248166 + 0i
    const result = new Complex(2, 0).acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});