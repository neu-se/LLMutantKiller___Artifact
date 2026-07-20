import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh(2+3i) with positive real part", () => {
    // acosh(2+3i): original returns re≈1.9833, im≈1.0001
    // mutant (if true always) would return re≈-1.0001, im≈1.9833
    const result = new Complex(2, 3).acosh();
    expect(result.re).toBeCloseTo(1.9833870299165355, 5);
    expect(result.im).toBeCloseTo(1.0001435424737972, 5);
  });
});