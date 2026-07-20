import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('sech function', () => {
  it('should correctly compute sech of a complex number with non-zero imaginary part', () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    
    // sech(1+i) = 2/(e^(1+i) + e^(-1-i))
    // Using the formula: sech(a+bi) = 2*cosh(a)*cos(b)/d - 2i*sinh(a)*sin(b)/d
    // where d = cos(2b) + cosh(2a)
    const a = 1, b = 1;
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});