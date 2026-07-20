import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute csc of a complex number with non-zero imaginary part", () => {
    // csc(z) = 1/sin(z)
    // For z = 1 + 1i, we can verify by computing sin(z) and checking csc(z) = 1/sin(z)
    const z = new Complex(1, 1);
    const result = z.csc();
    
    // Compute expected value: csc(z) = 1/sin(z)
    // sin(a + bi) = sin(a)cosh(b) + i*cos(a)sinh(b)
    const a = 1;
    const b = 1;
    const sinRe = Math.sin(a) * Math.cosh(b);
    const sinIm = Math.cos(a) * Math.sinh(b);
    
    // 1/(x+iy) = x/(x^2+y^2) - iy/(x^2+y^2)
    const denom = sinRe * sinRe + sinIm * sinIm;
    const expectedRe = sinRe / denom;
    const expectedIm = -sinIm / denom;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});