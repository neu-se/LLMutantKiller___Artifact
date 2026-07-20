import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asinh', () => {
  it('should correctly compute asinh of a real number and return correct imaginary part', () => {
    const c = new Complex(1, 0);
    const result = c.asinh();
    
    const expectedRe = Math.asinh(1); // ≈ 0.8813735870195430
    const expectedIm = 0;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});