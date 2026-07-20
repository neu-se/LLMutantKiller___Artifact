import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sec function", () => {
  it("should correctly compute sec(z) for a complex number with non-zero real and imaginary parts", () => {
    // sec(z) = 1 / cos(z)
    // The mutation changes `Math.cos(2 * a)` to `Math.cos(2 / a)` in the denominator calculation
    // For a = 1, b = 1:
    //   Original: d = 0.5 * cosh(2) + 0.5 * cos(2 * 1) = 0.5 * cosh(2) + 0.5 * cos(2)
    //   Mutated:  d = 0.5 * cosh(2) + 0.5 * cos(2 / 1) = 0.5 * cosh(2) + 0.5 * cos(2)
    // For a = 1, b = 1 the values happen to be the same since 2*1 == 2/1
    // Use a = 2, b = 1:
    //   Original: d = 0.5 * cosh(2) + 0.5 * cos(4)
    //   Mutated:  d = 0.5 * cosh(2) + 0.5 * cos(1)
    // These are different, so the result will differ

    const z = new Complex(2, 1);
    const result = z.sec();

    // Compute expected value: sec(z) = 1 / cos(z)
    // cos(a + bi) = cos(a)*cosh(b) - i*sin(a)*sinh(b)
    const a = 2;
    const b = 1;
    const cosRe = Math.cos(a) * Math.cosh(b);
    const cosIm = -Math.sin(a) * Math.sinh(b);
    const denom = cosRe * cosRe + cosIm * cosIm;
    const expectedRe = cosRe / denom;
    const expectedIm = -cosIm / denom;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});