import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute csc(z) for a complex number with non-trivial real and imaginary parts", () => {
    // csc(z) = 1/sin(z)
    // For z = 1 + i, we can verify by computing sin(z) and taking its inverse
    // sin(1 + i) = sin(1)cosh(1) + i*cos(1)sinh(1)
    // The denominator in csc is: 0.5 * cosh(2b) - 0.5 * cos(2a)
    // With mutation: 0.5 * cosh(2b) - 0.5 * cos(2/a) instead of cos(2*a)
    
    const a = 1;
    const b = 1;
    
    // Expected result: csc(1 + i) = 1/sin(1 + i)
    // sin(1 + i) = sin(1)*cosh(1) + i*cos(1)*sinh(1)
    const sinRe = Math.sin(a) * Math.cosh(b);
    const sinIm = Math.cos(a) * Math.sinh(b);
    const sinAbsSq = sinRe * sinRe + sinIm * sinIm;
    const expectedRe = sinRe / sinAbsSq;
    const expectedIm = -sinIm / sinAbsSq;
    
    const result = new Complex(a, b).csc();
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});