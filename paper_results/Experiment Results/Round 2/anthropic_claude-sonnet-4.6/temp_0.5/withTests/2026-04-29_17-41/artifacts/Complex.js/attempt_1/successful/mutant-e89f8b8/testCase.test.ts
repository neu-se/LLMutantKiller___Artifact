import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute the real part of csc for a complex number", () => {
    // csc(z) = 1/sin(z)
    // For z = 1 + 1i, we can verify by computing sin(z) and taking its inverse
    // The mutation changes division by d to multiplication by d in the real part
    // This will produce a drastically different result when d != 1
    
    const z = new Complex(1, 1);
    const result = z.csc();
    
    // Compute expected value: csc(1+i) = 1/sin(1+i)
    // sin(1+i) = sin(1)*cosh(1) + i*cos(1)*sinh(1)
    const sinRe = Math.sin(1) * Math.cosh(1);
    const sinIm = Math.cos(1) * Math.sinh(1);
    
    // 1/(a+bi) = a/(a^2+b^2) - bi/(a^2+b^2)
    const denom = sinRe * sinRe + sinIm * sinIm;
    const expectedRe = sinRe / denom;
    const expectedIm = -sinIm / denom;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});