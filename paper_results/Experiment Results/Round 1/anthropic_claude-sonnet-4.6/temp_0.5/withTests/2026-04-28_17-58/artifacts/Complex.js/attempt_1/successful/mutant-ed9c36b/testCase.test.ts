import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sec function", () => {
  it("should correctly compute the secant of a complex number with non-zero imaginary part", () => {
    // sec(z) uses: var b = this['im']; var d = 0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a);
    // The mutation changes 2 * b to 2 / b
    // For b = 1, 2 * b = 2, but 2 / b = 2 (same result!)
    // For b = 2, 2 * b = 4, but 2 / b = 1 (different result!)
    
    const z = new Complex(1, 2);
    const result = z.sec();
    
    // sec(1 + 2i) = 1 / cos(1 + 2i)
    // cos(a + bi) = cos(a)*cosh(b) - i*sin(a)*sinh(b)
    // cos(1 + 2i) = cos(1)*cosh(2) - i*sin(1)*sinh(2)
    const a = 1;
    const b = 2;
    const cosA = Math.cos(a);
    const sinA = Math.sin(a);
    const coshB = Math.cosh(b);
    const sinhB = Math.sinh(b);
    
    // cos(z) = cos(a)*cosh(b) - i*sin(a)*sinh(b)
    const cosRe = cosA * coshB;
    const cosIm = -sinA * sinhB;
    
    // sec(z) = 1 / cos(z) = conj(cos(z)) / |cos(z)|^2
    const denom = cosRe * cosRe + cosIm * cosIm;
    const expectedRe = cosRe / denom;
    const expectedIm = -cosIm / denom;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});