import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a real number like 0.5", () => {
    // atanh(0.5) = 0.5 * log((1+0.5)/(1-0.5)) = 0.5 * log(3) ≈ 0.5493061443340548
    const result = new Complex(0.5, 0).atanh();
    const expected = Math.atanh(0.5);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});