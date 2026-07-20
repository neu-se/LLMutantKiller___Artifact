import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sec function", () => {
  it("should compute the real part of sec(z) using cos(a)*cosh(b) not cos(a)/cosh(b)", () => {
    // sec(z) = 1 / cos(z)
    // For z = a + bi, the real part of sec involves cos(a)*cosh(b) in the numerator
    // The mutation changes cos(a)*cosh(b) to cos(a)/cosh(b)
    // We pick a value where cosh(b) != 1 to expose the difference
    
    // Use z = 1 + 1i, where b=1, cosh(1) ≈ 1.5430806348
    const z = new Complex(1, 1);
    const result = z.sec();
    
    // sec(1+i) = 1/cos(1+i)
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