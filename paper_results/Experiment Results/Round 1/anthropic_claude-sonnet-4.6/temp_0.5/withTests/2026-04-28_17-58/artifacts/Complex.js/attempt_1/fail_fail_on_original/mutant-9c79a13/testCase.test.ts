import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the real part of sech for a complex number", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For c = 1 + 1i:
    // d = cos(2b) - cosh(2a) = cos(2) - cosh(2)
    // re = 2 * cosh(a) * cos(b) / d  (original)
    // re = 2 * cosh(a) / cos(b) / d  (mutated)
    // These differ when cos(b) != 1, i.e., when b != 0
    
    const a = 1;
    const b = 1;
    const c = new Complex(a, b);
    const result = c.sech();
    
    // Compute expected value manually
    // sech(a + bi) = 2 / (e^(a+bi) + e^-(a+bi))
    // = 2 / ((e^a)(cos(b) + i*sin(b)) + (e^-a)(cos(b) - i*sin(b)))
    // = 2 / (2*cosh(a)*cos(b) + 2i*sinh(a)*sin(b))
    // Re(sech) = 2*cosh(a)*cos(b) / (cosh(2a) - cos(2b)) * (-1)
    // Wait, let's use the formula from the code:
    // d = cos(2b) - cosh(2a)
    // re = 2 * cosh(a) * cos(b) / d
    
    const coshA = Math.cosh(a);
    const cosB = Math.cos(b);
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    
    const expectedRe = 2 * coshA * cosB / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});