import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the real part of sech for a complex number", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For c = 1 + 1i:
    // sech(c) real part = 2 * cosh(a) * cos(b) / d  (original)
    // where d = cos(2b) - cosh(2a)
    // The mutation changes cos(b) multiplication to division: 2 * cosh(a) / cos(b) / d
    // These will differ when cos(b) != 1 (i.e., b != 0)
    
    const a = 1;
    const b = 1;
    const c = new Complex(a, b);
    const result = c.sech();
    
    // Compute expected value manually
    // d = cos(2*1) - cosh(2*1)
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});