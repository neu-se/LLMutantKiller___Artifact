import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should correctly compute the cosine of a complex number with non-zero imaginary part using cosh", () => {
    // cos(z) = cos(a)cosh(b) - i sin(a)sinh(b)
    // For z = 0 + 2i: cos(0 + 2i) = cos(0)*cosh(2) - i*sin(0)*sinh(2) = cosh(2)
    // cosh(2) ≈ 3.7621956910213407
    const z = new Complex(0, 2);
    const result = z.cos();
    expect(result.re).toBeCloseTo(Math.cosh(2), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});