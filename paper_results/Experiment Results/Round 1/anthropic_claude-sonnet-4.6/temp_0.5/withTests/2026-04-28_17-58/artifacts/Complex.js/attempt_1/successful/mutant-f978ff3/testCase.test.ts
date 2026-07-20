import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should compute the real part of csch correctly using division not multiplication by d", () => {
    // csch(c) = 2 / (e^c - e^-c)
    // For z = 1 + 1i:
    // a = 1, b = 1
    // d = cos(2*1) - cosh(2/1) = cos(2) - cosh(2)
    // re = -2 * sinh(a) * Math.sin(b) / d  (original: division by d)
    // mutant: re = -2 * sinh(a) * Math.sin(b) * d  (mutant: multiplication by d)
    
    const z = new Complex(1, 1);
    const result = z.csch();
    
    // Compute expected value manually
    // csch(1 + i) = 1/sinh(1 + i)
    // sinh(1 + i) = sinh(1)*cos(1) + i*cosh(1)*sin(1)
    const sinhA = Math.sinh(1);
    const coshA = Math.cosh(1);
    const sinB = Math.sin(1);
    const cosB = Math.cos(1);
    
    const sinhRe = sinhA * cosB;
    const sinhIm = coshA * sinB;
    
    // 1 / (sinhRe + i*sinhIm) = sinhRe / (sinhRe^2 + sinhIm^2) - i * sinhIm / (sinhRe^2 + sinhIm^2)
    const denom = sinhRe * sinhRe + sinhIm * sinhIm;
    const expectedRe = sinhRe / denom;
    const expectedIm = -sinhIm / denom;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});