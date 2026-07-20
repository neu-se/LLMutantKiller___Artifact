import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atanh", () => {
  it("should correctly compute atanh for a purely imaginary number", () => {
    // atanh(2i) = i * atan(2)
    // Re(atanh(2i)) = 0
    // Im(atanh(2i)) = atan(2) ≈ 1.1071487177940904
    const z = new Complex(0, 2);
    const result = z.atanh();

    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.atan(2), 10);
  });
});