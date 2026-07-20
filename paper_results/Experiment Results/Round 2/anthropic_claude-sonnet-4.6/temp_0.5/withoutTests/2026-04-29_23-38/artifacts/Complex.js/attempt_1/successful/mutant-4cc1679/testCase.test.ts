import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should compute acosh of a real number greater than 1", () => {
    const result = new Complex(2, 0).acosh();
    // acosh(2) = log(2 + sqrt(3)) ≈ 1.3169578969248166
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});