import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex csc function', () => {
  it('should correctly calculate the cosecant of a complex number', () => {
    // csc(z) = 1/sin(z)
    // For z = 1 + i, sin(1+i) = sin(1)cosh(1) + i*cos(1)sinh(1)
    // csc should return a valid complex number with correct real and imaginary parts
    const z = new Complex(1, 1);
    const result = z.csc();
    
    // The expected values for csc(1 + i):
    // sin(1+i) = sin(1)*cosh(1) + i*cos(1)*sinh(1)
    const sinRe = Math.sin(1) * Math.cosh(1);
    const sinIm = Math.cos(1) * Math.sinh(1);
    const denom = sinRe * sinRe + sinIm * sinIm;
    const expectedRe = sinRe / denom;
    const expectedIm = -sinIm / denom;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});