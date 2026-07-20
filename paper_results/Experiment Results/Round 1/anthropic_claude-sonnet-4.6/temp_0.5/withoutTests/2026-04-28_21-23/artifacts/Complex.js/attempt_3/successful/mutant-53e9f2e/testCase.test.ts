import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for 2i", () => {
    // atanh(2i) = i * atan(2)
    // Expected: re = 0, im = atan(2) ≈ 1.1071487177940904
    const result = new Complex(0, 2).atanh();

    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.atan(2), 10);
  });
});