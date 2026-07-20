import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should compute sech(1+i) real part using multiplication not division by cos(b)", () => {
    // For z = 1 + 1i, the real part of sech should be:
    // 2 * cosh(1) * cos(1) / (cos(2) - cosh(2))
    // NOT 2 * cosh(1) / cos(1) / (cos(2) - cosh(2))
    
    // Verify using the identity: sech(z) = 1/cosh(z)
    // cosh(1+i) = cosh(1)*cos(1) + i*sinh(1)*sin(1)
    // sech(1+i) = 1/cosh(1+i) = conj(cosh(1+i)) / |cosh(1+i)|^2
    
    const a = 1;
    const b = 1;
    
    const coshRe = Math.cosh(a) * Math.cos(b);
    const coshIm = Math.sinh(a) * Math.sin(b);
    const absSq = coshRe * coshRe + coshIm * coshIm;
    
    const expectedRe = coshRe / absSq;
    const expectedIm = -coshIm / absSq;
    
    const z = new Complex(a, b);
    const result = z.sech();
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});