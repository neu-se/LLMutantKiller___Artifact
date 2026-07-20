import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asinh', () => {
  it('should correctly compute asinh of a real number without corrupting the result', () => {
    const c = new Complex(1, 0);
    const result = c.asinh();
    
    // asinh(1) = ln(1 + sqrt(2)) ≈ 0.8813735870195430
    const expected = Math.asinh(1);
    
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});