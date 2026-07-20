import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh fallback behavior via sin with imaginary part", () => {
  it("should correctly compute sin of a complex number with imaginary part, using cosh internally", () => {
    // sin(a + bi) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // For a=0, b=1: sin(0+i) = sin(0)*cosh(1) + i*cos(0)*sinh(1) = 0 + i*sinh(1)
    // cosh(1) = (e + 1/e)/2 ≈ 1.5430806348152437
    // If mutation applies: cosh(1) = 1 - 1 = 0, so re = sin(0)*0 = 0 (same)
    // Need a case where re part uses cosh with non-zero sin(a)
    // For a=1, b=1: sin(1)*cosh(1) + i*cos(1)*sinh(1)
    const result = new Complex(1, 1).sin();
    const expectedRe = Math.sin(1) * Math.cosh(1);
    const expectedIm = Math.cos(1) * Math.sinh(1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});