import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sec function", () => {
  it("should correctly compute the real part of sec(z) using cos(a)*cosh(b) not cos(a)/cosh(b)", () => {
    // sec(z) where z = 1 + 1i
    // The real part of sec(z) should use Math.cos(a) * cosh(b) / d
    // The mutation changes it to Math.cos(a) / cosh(b) / d
    // For a = 1, b = 1:
    // cosh(b) = cosh(1) ≈ 1.5430806348152437
    // cos(a) = cos(1) ≈ 0.5403023058681398
    // cos(a) * cosh(b) ≈ 0.8337278500
    // cos(a) / cosh(b) ≈ 0.3501754884
    // These differ significantly, so we can detect the mutation

    const z = new Complex(1, 1);
    const result = z.sec();

    // Expected value: sec(1+i)
    // sec(z) = 1/cos(z)
    // cos(1+i) = cos(1)*cosh(1) - i*sin(1)*sinh(1)
    const cosRe = Math.cos(1) * Math.cosh(1);
    const cosIm = -Math.sin(1) * Math.sinh(1);
    const denom = cosRe * cosRe + cosIm * cosIm;
    const expectedRe = cosRe / denom;
    const expectedIm = -cosIm / denom;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});