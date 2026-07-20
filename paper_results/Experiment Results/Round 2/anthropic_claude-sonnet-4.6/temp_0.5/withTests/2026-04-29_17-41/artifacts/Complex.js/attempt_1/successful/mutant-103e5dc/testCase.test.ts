import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute csc of a complex number with non-zero real and imaginary parts", () => {
    // csc(z) = 1/sin(z)
    // For z = 1 + i, we can verify against the known formula
    // The mutation changes Math.cos(2 * a) to Math.cos(2 / a)
    // For a = 1, 2*a = 2 and 2/a = 2, so they are equal - need a != 1
    // For a = 2, 2*a = 4 and 2/a = 1, so they differ
    
    const z = new Complex(2, 1);
    const result = z.csc();
    
    // csc(2 + i) = 1 / sin(2 + i)
    // sin(2 + i) = sin(2)*cosh(1) + i*cos(2)*sinh(1)
    const sinRe = Math.sin(2) * Math.cosh(1);
    const sinIm = Math.cos(2) * Math.sinh(1);
    
    // 1 / (sinRe + i*sinIm) = sinRe/(sinRe^2 + sinIm^2) - i*sinIm/(sinRe^2 + sinIm^2)
    const denom = sinRe * sinRe + sinIm * sinIm;
    const expectedRe = sinRe / denom;
    const expectedIm = -sinIm / denom;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});