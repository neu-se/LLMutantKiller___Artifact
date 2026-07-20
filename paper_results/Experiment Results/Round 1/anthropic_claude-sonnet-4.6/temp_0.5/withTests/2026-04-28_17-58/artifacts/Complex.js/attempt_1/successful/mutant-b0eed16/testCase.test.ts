import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sec function", () => {
  it("should compute sec(z) correctly for a complex number with non-zero imaginary part", () => {
    // sec(z) = 1 / cos(z)
    // For z = 1 + 1i, the real part of sec(z) involves Math.cos(a) * cosh(b) / d
    // The mutation changes this to Math.cos(a) / cosh(b) / d
    // These differ when b != 0 and cosh(b) != 1

    const z = new Complex(1, 1);
    const result = z.sec();

    // Compute expected value: sec(1+i) = 1/cos(1+i)
    // cos(1+i) = cos(1)*cosh(1) - i*sin(1)*sinh(1)
    const a = 1;
    const b = 1;
    const coshB = Math.cosh(b);
    const sinhB = Math.sinh(b);
    const cosA = Math.cos(a);
    const sinA = Math.sin(a);

    // cos(z) real = cos(a)*cosh(b), imag = -sin(a)*sinh(b)
    const cosZRe = cosA * coshB;
    const cosZIm = -sinA * sinhB;

    // sec(z) = 1/cos(z) = conj(cos(z)) / |cos(z)|^2
    const denom = cosZRe * cosZRe + cosZIm * cosZIm;
    const expectedRe = cosZRe / denom;
    const expectedIm = -cosZIm / denom;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});