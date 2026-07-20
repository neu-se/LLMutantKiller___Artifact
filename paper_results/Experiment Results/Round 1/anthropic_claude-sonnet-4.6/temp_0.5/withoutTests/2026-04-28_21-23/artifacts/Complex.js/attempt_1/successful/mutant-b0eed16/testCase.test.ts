import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sec function", () => {
  it("should correctly compute the real part of sec(z) using cos(a)*cosh(b) not cos(a)/cosh(b)", () => {
    // sec(z) = 1 / cos(z)
    // For z = 1 + 1i:
    // The real part of sec should use cos(a) * cosh(b) in numerator
    // Original: re = cos(a) * cosh(b) / d
    // Mutated:  re = cos(a) / cosh(b) / d
    // These differ when cosh(b) != 1, i.e., when b != 0

    const a = 1;
    const b = 1;
    const z = new Complex(a, b);
    const result = z.sec();

    // Compute expected value manually
    // sec(z) = 1 / cos(z)
    // cos(z) = cos(a)*cosh(b) - i*sin(a)*sinh(b)
    const cosRe = Math.cos(a) * Math.cosh(b);
    const cosIm = -Math.sin(a) * Math.sinh(b);
    const denom = cosRe * cosRe + cosIm * cosIm;
    const expectedRe = cosRe / denom;
    const expectedIm = -cosIm / denom;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});