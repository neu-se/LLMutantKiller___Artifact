import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh', () => {
  it('should correctly compute sinh of a complex number with non-zero imaginary part', () => {
    // sinh(1 + i) = sinh(1)*cos(1) + i*cosh(1)*sin(1)
    const result = new Complex(1, 1).sinh();
    
    const expectedRe = Math.sinh(1) * Math.cos(1);
    const expectedIm = Math.cosh(1) * Math.sin(1);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});