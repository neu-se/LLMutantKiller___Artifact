import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should correctly compute acoth of a real number greater than 1", () => {
    const c = new Complex(2, 0);
    const result = c.acoth();
    // acoth(2) = atanh(1/2) = log((1+0.5)/(1-0.5))/2 = log(3)/2 ≈ 0.5493
    const expected = Math.log(3) / 2;
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});