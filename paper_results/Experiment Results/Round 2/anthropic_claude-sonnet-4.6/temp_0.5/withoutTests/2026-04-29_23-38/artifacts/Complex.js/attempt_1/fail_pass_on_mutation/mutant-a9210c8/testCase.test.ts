import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute sech of a complex number with non-zero imaginary part", () => {
    // sech(a + bi) = 2 / (e^(a+bi) + e^(-(a+bi)))
    // = 2*cosh(a)*cos(b) / (cos(2b) + cosh(2a)) - 2i*sinh(a)*sin(b) / (cos(2b) + cosh(2a))
    const c = new Complex(1, 1);
    const result = c.sech();
    
    // Expected values for sech(1 + i):
    // d = cos(2) + cosh(2)
    const a = 1;
    const b = 1;
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});