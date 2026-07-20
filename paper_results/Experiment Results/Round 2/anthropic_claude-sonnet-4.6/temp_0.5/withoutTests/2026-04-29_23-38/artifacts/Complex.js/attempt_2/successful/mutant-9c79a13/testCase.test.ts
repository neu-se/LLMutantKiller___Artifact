import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should compute the real part of sech using cos(b) as a factor not a divisor", () => {
    // For z = 1 + (pi/3)i:
    // a=1, b=pi/3
    // cos(pi/3) = 0.5
    // Original re = 2 * cosh(1) * cos(pi/3) / d = 2 * cosh(1) * 0.5 / d
    // Mutated re  = 2 * cosh(1) / cos(pi/3) / d = 2 * cosh(1) / 0.5 / d = 4 * cosh(1) / d
    // These differ by a factor of cos(pi/3)^2 = 0.25
    
    const z = new Complex(1, Math.PI / 3);
    const result = z.sech();
    
    // Compute expected value from the formula: sech(z) = 1/cosh(z)
    // cosh(a+bi) = cosh(a)cos(b) + i*sinh(a)sin(b)
    // sech(z) = 1/cosh(z) = conj(cosh(z)) / |cosh(z)|^2
    const a = 1;
    const b = Math.PI / 3;
    const coshRe = Math.cosh(a) * Math.cos(b);
    const coshIm = Math.sinh(a) * Math.sin(b);
    const mag2 = coshRe * coshRe + coshIm * coshIm;
    const expectedRe = coshRe / mag2;
    const expectedIm = -coshIm / mag2;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});