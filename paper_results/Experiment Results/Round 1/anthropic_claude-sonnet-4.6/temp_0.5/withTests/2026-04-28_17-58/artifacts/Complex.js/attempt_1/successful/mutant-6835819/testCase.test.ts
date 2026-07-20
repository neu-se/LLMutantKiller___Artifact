import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("atanh mutation detection", () => {
  it("should correctly compute atanh of a purely imaginary number with non-unit imaginary part", () => {
    // For z = 0 + 2i:
    // atanh(2i) = log((1+2i)/(1-2i))/2
    // The real part of atanh(2i) should be 0 (since |1+2i| = |1-2i|)
    // The imaginary part should be atan(2) ≈ 1.1071487177940904
    const z = new Complex(0, 2);
    const result = z.atanh();

    // Original code: onePlus * oneMinus - b * b = 1*1 - 4 = -3, then /5 = -0.6
    // Mutated code: onePlus * oneMinus - b / b = 1*1 - 1 = 0, then /5 = 0
    // These lead to different atanh results

    // atanh(2i) should have real part = 0
    expect(result.re).toBeCloseTo(0, 10);
    // atanh(2i) should have imaginary part = atan(2)
    expect(result.im).toBeCloseTo(Math.atan(2), 10);
  });
});