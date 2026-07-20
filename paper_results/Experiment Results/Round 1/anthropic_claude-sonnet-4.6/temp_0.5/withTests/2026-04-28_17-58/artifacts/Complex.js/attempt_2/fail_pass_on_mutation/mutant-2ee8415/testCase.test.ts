import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a purely imaginary number where acos result has positive imaginary part", () => {
    // For z = 0 + 1i, acosh should follow the else branch (res.im > 0)
    // acosh(i) = log(i + sqrt(i^2 - 1)) = log(i + sqrt(-2)) = log(i + i*sqrt(2))
    // = log(i*(1 + sqrt(2))) = ln(1+sqrt(2)) + i*pi/2
    const c = new Complex(0, 1);
    const result = c.acosh();
    const expectedRe = Math.log(1 + Math.sqrt(2)); // ≈ 0.8813735870195430
    const expectedIm = Math.PI / 2; // ≈ 1.5707963267948966
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});