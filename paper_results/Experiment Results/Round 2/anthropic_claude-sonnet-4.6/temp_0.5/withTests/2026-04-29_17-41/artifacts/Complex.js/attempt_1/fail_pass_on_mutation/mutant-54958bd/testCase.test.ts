import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for values greater than 1", () => {
    const result = new Complex(2, 0).acosh();
    // acosh(2) ≈ 1.3169578969248166
    const expected = Math.acosh(2);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});