import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh mutation detection", () => {
  it("should correctly compute atanh for a complex number with non-unit imaginary part", () => {
    // For z = 0 + 2i:
    // atanh(2i) = i * atan(2) ≈ 0 + 1.1071487177940904i
    // Original: d = oneMinus^2 + b*b = 1 + 4 = 5
    // Mutated:  d = oneMinus^2 + b/b = 1 + 1 = 2 (wrong)
    const z = new Complex(0, 2);
    const result = z.atanh();

    // atanh(2i) = i * atan(2)
    const expectedIm = Math.atan(2); // approximately 1.1071487177940904
    const expectedRe = 0;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});