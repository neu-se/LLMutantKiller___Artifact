import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should compute the real part of sech correctly using multiplication not division", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For a complex number a + bi:
    // d = cos(2b) - cosh(2a)
    // re = 2 * cosh(a) * cos(b) / d  (original)
    // re = 2 * cosh(a) / cos(b) / d  (mutated)
    // These differ when cos(b) != 1, i.e., when b != 0
    
    // Use z = 0 + (pi/4)i, so a=0, b=pi/4
    // cos(pi/4) = sqrt(2)/2 ≈ 0.7071
    // cosh(0) = 1
    // d = cos(pi/2) - cosh(0) = 0 - 1 = -1
    // Original re = 2 * 1 * cos(pi/4) / (-1) = 2 * 0.7071 / (-1) ≈ -1.4142
    // Mutated re = 2 * 1 / cos(pi/4) / (-1) = 2 / 0.7071 / (-1) ≈ -2.8284
    
    const z = new Complex(0, Math.PI / 4);
    const result = z.sech();
    
    const a = 0;
    const b = Math.PI / 4;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});