import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth for a real number greater than 1", () => {
    // acoth(2) = atanh(1/2) = 0.5 * log(3) ≈ 0.5493...
    const result = new Complex(2, 0).acoth();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});